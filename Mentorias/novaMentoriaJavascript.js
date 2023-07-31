const setaVoltar = () => {
    window.location = "./mentorias.html";
}

const formulario = document.getElementById("formulario");
const mentorSelect = document.getElementById("mentor");

// Função assíncrona que faz uma requisição à API para buscar a lista de mentores
const buscarMentores = async () => {
    const resposta = await fetch("https://api-projetofinal-md1.onrender.com/Mentores");
    const mentores = await resposta.json();
    return mentores;
}

// Função assíncrona para cadastrar uma nova mentoria através de uma requisição POST à API
const cadastrarMentoria = async (mentoria) => {
    await fetch("https://api-projetofinal-md1.onrender.com/Mentorias", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mentoria)
    });
    window.location = "./mentorias.html"; // Redireciona para a página "mentorias.html" após o cadastro
}

// Função assíncrona para popular o seletor de mentores com os dados da API
const popularSelectMentores = async () => {
    const mentores = await buscarMentores();

    // Limpa o seletor de mentores e adiciona uma opção padrão desabilitada e selecionada
    mentorSelect.innerHTML = '<option value="" disabled selected>Selecione um Mentor</option>';

    // Itera sobre a lista de mentores e cria uma opção para cada mentor no seletor
    mentores.forEach((mentor) => {
        const option = document.createElement("option");
        option.value = mentor.nome;
        option.textContent = mentor.nome;
        mentorSelect.appendChild(option);
    });
}

// Adiciona um listener para o evento de "submit" no formulário
formulario.addEventListener("submit", async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submissão do formulário

    // Captura os valores do título, nome do mentor e status preenchidos no formulário
    const titulo = formulario.elements["titulo"].value;
    const nomeMentor = formulario.elements["mentor"].value;
    const statusAtivo = formulario.elements["status"].checked;

    // Busca a lista de mentores existentes através da função "buscarMentores()"
    const mentores = await buscarMentores();

    // Verifica se o mentor selecionado existe na lista de mentores
    const mentorObjeto = mentores.find((mentor) => mentor.nome === nomeMentor);
    if (!mentorObjeto) {
        console.error("Erro: Mentor selecionado não existe.");
        return;
    }

    // Define o status da mentoria com base no valor do checkbox "status"
    const status = statusAtivo ? "Ativo" : "Inativo";

    // Cria um objeto com os dados da nova mentoria
    const mentoriaNova = {
        titulo,
        mentor: nomeMentor,
        status
    };

    // Chama a função "cadastrarMentoria()" para enviar a nova mentoria para a API
    cadastrarMentoria(mentoriaNova);
})

// Chama a função "popularSelectMentores()" para preencher o seletor de mentores com os dados da API
popularSelectMentores();