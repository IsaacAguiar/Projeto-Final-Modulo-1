const setaVoltar = () => {
    window.location = "./mentores.html";
};

// Captura o elemento do formulário através do ID
const formulario = document.getElementById('formulario');

// Função assíncrona que faz uma requisição à API para buscar os mentores
const buscarMentores = async () => {
    const resposta = await fetch('https://api-projetofinal-md1.onrender.com/Mentores');
    const data = await resposta.json();

    // Verifica se a propriedade "Mentores" existe no JSON e trata o caso de estar vazia
    const mentores = data.Mentores || [];
    return mentores;
};

// Função assíncrona para cadastrar um novo mentor através de uma requisição POST à API
const cadastrarMentor = async (mentor) => {
    await fetch('https://api-projetofinal-md1.onrender.com/Mentores', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
    });
    window.location = './mentores.html'; // Redireciona para a página "mentores.html" após o cadastro
};

// Adiciona um listener para o evento de "submit" no formulário
formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submissão do formulário

    // Captura os valores do nome e email preenchidos no formulário
    const nome = formulario.elements['nome'].value;
    const email = formulario.elements['email'].value;

    // Busca a lista de mentores existentes através da função "buscarMentores()"
    const mentores = await buscarMentores();

    // Verifica se o mentor já está cadastrado na lista de mentores
    const mentorExistente = mentores.find(mentor => mentor.nome === nome);
    if (mentorExistente) {
        console.error('Erro: Mentor já cadastrado.');
        return;
    }

    // Se o mentor não estiver cadastrado, cria um objeto com os dados do novo mentor
    const mentorNovo = {
        nome,
        email
    };

    // Chama a função "cadastrarMentor()" para enviar o novo mentor para a API
    cadastrarMentor(mentorNovo);
});