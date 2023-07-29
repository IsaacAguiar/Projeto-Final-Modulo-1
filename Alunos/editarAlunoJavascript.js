const setaVoltar = () => {
    window.location = "./alunos.html"
}

const formulario = document.getElementById('formulario');

const recuperarId = () => {
  const parametros = window.location.search;
  const parametrosObjeto = new URLSearchParams(parametros);
  const id = parametrosObjeto.get('id');
  return id;
};

const buscarAluno = async (id) => {
  const resultado = await fetch(`http://localhost:3000/Alunos/${id}`);
  const aluno = await resultado.json();
  return aluno;
};

const carregarDadosFormulario = (aluno) => {
  document.getElementById('nome').value = aluno.nomeAluno;
  document.getElementById('email').value = aluno.emailAluno;
};

const editarAluno = async (id, aluno) => {
  await fetch(`http://localhost:3000/Alunos/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(aluno)
  });
};

const buscarTurmas = async () => {
  const resultado = await fetch('http://localhost:3000/Turmas');
  const turmas = await resultado.json();
  return turmas;
};

const carregarTurmas = (turmas, turmaAluno) => {
  const turmaSelect = document.getElementById('turma');

  turmas.forEach((turma) => {
    const option = document.createElement('option');
    option.value = turma.turma;
    option.textContent = turma.titulo;
    if (turma.turma === turmaAluno) {
      option.selected = true;
    }
    turmaSelect.appendChild(option);
  });
};

const carregarDadosEditar = async () => {
  const idEditar = recuperarId();
  const aluno = await buscarAluno(idEditar);
  carregarDadosFormulario(aluno);

  const turmas = await buscarTurmas();
  carregarTurmas(turmas, aluno.turmaAluno);
};

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const idEditar = recuperarId();
  const nomeAluno = formulario.elements['nome'].value;
  const emailAluno = formulario.elements['email'].value;
  const turmaAluno = formulario.elements['turma'].value;

  const aluno = {
    nomeAluno,
    emailAluno,
    turmaAluno
  };

  await editarAluno(idEditar, aluno);

  window.location = './alunos.html';
});

carregarDadosEditar();