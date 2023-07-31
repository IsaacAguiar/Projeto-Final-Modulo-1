const setaVoltar = () => {
    window.location = "./alunos.html"
}

const formulario = document.getElementById('formulario');

// Função assíncrona para buscar as turmas disponíveis na API
const buscarTurmas = async () => {
    const resposta = await fetch('https://api-projetofinal-md1.onrender.com/Turmas');
    const turmas = await resposta.json();
    return turmas;
};

// Função para popular o dropdown de turmas no formulário de cadastro
const popularDropdownTurmas = (turmas) => {
    const turmaSelect = document.getElementById('turma');
    turmaSelect.innerHTML = '<option value="" disabled selected>Selecione uma Turma</option>';

    turmas.forEach(turma => {
        const option = document.createElement('option');
        option.value = turma.id;
        option.textContent = turma.turma;
        turmaSelect.appendChild(option);
    });
};

// Função assíncrona para cadastrar um novo aluno na API
const cadastrarAluno = async (aluno) => {
    await fetch('https://api-projetofinal-md1.onrender.com/Alunos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    });
    window.location = './alunos.html';
};

// Adiciona um listener para o evento de "submit" no formulário de cadastro de aluno
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtém os valores do formulário
    const nome = formulario.elements['nome'].value;
    const email = formulario.elements['email'].value;
    const turmaSelect = formulario.elements['turma'];
    const turmaId = turmaSelect.value;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !turmaId) {
        console.error('Erro: Preencha todos os campos.');
        return;
    }

    // Busca as turmas disponíveis na API
    const turmas = await buscarTurmas();

    // Verifica se as turmas foram obtidas corretamente
    if (turmas.length === 0) {
        console.error('Erro: Não foi possível buscar as turmas.');
        return;
    }

    // Encontra a turma selecionada pelo ID
    const turmaSelecionada = turmas.find(turma => turma.id === parseInt(turmaId));

    // Verifica se a turma selecionada foi encontrada
    if (!turmaSelecionada) {
        console.error('Erro: Turma selecionada não encontrada.');
        return;
    }

    // Cria o objeto com os dados do novo aluno a ser cadastrado
    const alunoNovo = {
        nomeAluno: nome,
        emailAluno: email,
        turmaAluno: turmaSelecionada.turma
    };

    // Chama a função para cadastrar o novo aluno na API
    cadastrarAluno(alunoNovo);
});

// IIFE (Immediately Invoked Function Expression) para buscar as turmas e popular o dropdown ao carregar a página
(async () => {
    const turmas = await buscarTurmas();
    popularDropdownTurmas(turmas);
})();