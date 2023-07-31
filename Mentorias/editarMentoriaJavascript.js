const setaVoltar = () => {
    window.location = "./mentorias.html";
}

const formulario = document.getElementById('formulario');
const selectMentor = document.getElementById('mentor');

// Função para recuperar o parâmetro "id" da URL da página
const recuperarId = () => {
    const parametros = window.location.search;
    const parametrosObjeto = new URLSearchParams(parametros);
    const id = parametrosObjeto.get('id');
    return id;
};

// Função assíncrona que busca uma mentoria específica através do ID
const buscarMentoria = async (id) => {
    const resultado = await fetch(`https://api-projetofinal-md1.onrender.com/Mentorias/${id}`);
    const mentoria = await resultado.json();
    return mentoria;
};

// Função assíncrona que busca a lista de mentores
const buscarMentores = async () => {
    const resultado = await fetch('https://api-projetofinal-md1.onrender.com/Mentores');
    const mentores = await resultado.json();
    return mentores;
};

// Função assíncrona para carregar os dados da mentoria no formulário de edição
const carregarDadosFormulario = async (mentoria, mentores) => {
    document.getElementById('titulo').value = mentoria.titulo;

    selectMentor.innerHTML = '<option value="" disabled>Selecione um Mentor</option>';
    for (const mentor of mentores) {
        const option = document.createElement('option');
        option.value = mentor.nome;
        option.textContent = mentor.nome;
        if (mentor.nome === mentoria.mentor) {
            option.selected = true;
        }
        selectMentor.appendChild(option);
    }

    document.getElementById('status').checked = mentoria.status === 'Ativo';
};

// Função assíncrona para editar uma mentoria através de uma requisição PUT à API
const editarMentoria = async (id, mentoria) => {
    await fetch(`https://api-projetofinal-md1.onrender.com/Mentorias/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentoria)
    });
};

// Função assíncrona para carregar os dados da mentoria a ser editada
const carregarDadosEditar = async () => {
    const idEditar = recuperarId();

    const mentoria = await buscarMentoria(idEditar);
    const mentores = await buscarMentores();

    carregarDadosFormulario(mentoria, mentores);
};

// Adiciona um listener para o evento de "submit" no formulário
formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submissão do formulário

    // Captura os valores do título, nome do mentor e status preenchidos no formulário
    const titulo = formulario.elements['titulo'].value;
    const mentor = formulario.elements['mentor'].value;
    const status = formulario.elements['status'].checked ? 'Ativo' : 'Inativo';

    // Cria um objeto com os dados da mentoria a ser editada
    const mentoria = {
        titulo,
        mentor,
        status
    };

    // Recupera o ID da mentoria a ser editada
    const idEditar = recuperarId();

    // Chama a função "editarMentoria()" para enviar as alterações para a API
    await editarMentoria(idEditar, mentoria);

    // Redireciona para a página "mentorias.html" após a edição
    window.location = '../Mentorias/mentorias.html';
});

// Chama a função "carregarDadosEditar()" para preencher o formulário de edição com os dados da mentoria
carregarDadosEditar();