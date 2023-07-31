const setaVoltar = () => {
    window.location = "./mentores.html"
}

const formulario = document.getElementById('formulario');

// Função que recupera o ID do mentor a ser editado da URL da página
const recuperarId = () => {
    const parametros = window.location.search;
    const parametrosObjeto = new URLSearchParams(parametros);
    const id = parametrosObjeto.get('id');
    return id;
};

// Função assíncrona para buscar os dados do mentor pelo ID
const buscarMentor = async (id) => {
    const resultado = await fetch(`https://api-projetofinal-md1.onrender.com/mentores/${id}`);
    const mentor = await resultado.json();
    return mentor;
};

// Função para preencher os campos do formulário com os dados do mentor
const carregarDadosFormulario = (mentor) => {
    document.getElementById('nome').value = mentor.nome;
    document.getElementById('email').value = mentor.email;
};

// Função assíncrona para editar as informações do mentor através de uma requisição PUT à API
const editarMentor = async (id, mentor) => {
    await fetch(`https://api-projetofinal-md1.onrender.com/mentores/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
    });
};

// Função assíncrona para carregar os dados do mentor a ser editado no formulário
const carregarDadosEditar = async () => {
    // Recupera o ID do mentor a ser editado
    const idEditar = recuperarId();

    // Busca os dados do mentor através do ID
    const mentor = await buscarMentor(idEditar);

    // Preenche o formulário com os dados do mentor
    carregarDadosFormulario(mentor);
};

// Adiciona um listener para o evento de "submit" no formulário
formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submissão do formulário

    // Captura os valores do nome e email preenchidos no formulário
    const nome = formulario.elements['nome'].value;
    const email = formulario.elements['email'].value;

    // Cria um objeto com os dados atualizados do mentor
    const mentor = {
        nome,
        email
    };

    // Recupera o ID do mentor a ser editado
    const idEditar = recuperarId();

    // Chama a função "editarMentor()" para enviar as alterações para a API
    await editarMentor(idEditar, mentor);

    // Redireciona para a página "mentores.html" após a edição
    window.location = './mentores.html';
});

// Chama a função "carregarDadosEditar()" para preencher o formulário com os dados do mentor
carregarDadosEditar();
