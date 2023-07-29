const setaVoltar = () => {
    window.location = "./alunos.html"
}

const formulario = document.getElementById('formulario');

const buscarTurmas = async () => {
    const resposta = await fetch('http://localhost:3000/Turmas');
    const turmas = await resposta.json();
    return turmas;
};

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

const cadastrarAluno = async (aluno) => {
    await fetch('http://localhost:3000/Alunos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    });
    window.location = './alunos.html';
};

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = formulario.elements['nome'].value;
    const email = formulario.elements['email'].value;
    const turmaSelect = formulario.elements['turma'];
    const turmaId = turmaSelect.value;

    if (!nome || !email || !turmaId) {
        console.error('Erro: Preencha todos os campos.');
        return;
    }

    const turmas = await buscarTurmas();

    if (turmas.length === 0) {
        console.error('Erro: Não foi possível buscar as turmas.');
        return;
    }

    const turmaSelecionada = turmas.find(turma => turma.id === parseInt(turmaId));

    if (!turmaSelecionada) {
        console.error('Erro: Turma selecionada não encontrada.');
        return;
    }

    const alunoNovo = {
        nomeAluno: nome,
        emailAluno: email,
        turmaAluno: turmaSelecionada.turma
    };

    cadastrarAluno(alunoNovo);
});

(async () => {
    const turmas = await buscarTurmas();
    popularDropdownTurmas(turmas);
})();