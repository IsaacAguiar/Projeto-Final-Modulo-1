const setaVoltar = () => {
    window.location = "./alunos.html"
}

const formulario = document.getElementById('formulario');

// Função para recuperar o ID do aluno a ser editado da URL
const recuperarId = () => {
  const parametros = window.location.search;
  const parametrosObjeto = new URLSearchParams(parametros);
  const id = parametrosObjeto.get('id');
  return id;
};

// Função assíncrona para buscar o aluno a ser editado pelo ID
const buscarAluno = async (id) => {
  const resultado = await fetch(`https://api-projetofinal-md1.onrender.com/Alunos/${id}`);
  const aluno = await resultado.json();
  return aluno;
};

// Função para carregar os dados do aluno no formulário de edição
const carregarDadosFormulario = (aluno) => {
  document.getElementById('nome').value = aluno.nomeAluno;
  document.getElementById('email').value = aluno.emailAluno;
};

// Função assíncrona para enviar os dados editados do aluno para a API
const editarAluno = async (id, aluno) => {
  await fetch(`https://api-projetofinal-md1.onrender.com/Alunos/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(aluno)
  });
};

// Função assíncrona para buscar as turmas disponíveis
const buscarTurmas = async () => {
  const resultado = await fetch('https://api-projetofinal-md1.onrender.com/Turmas');
  const turmas = await resultado.json();
  return turmas;
};

// Função para carregar as turmas no elemento select no formulário de edição
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

// Função assíncrona para carregar os dados do aluno a ser editado e as turmas disponíveis
const carregarDadosEditar = async () => {
  const idEditar = recuperarId();
  const aluno = await buscarAluno(idEditar);
  carregarDadosFormulario(aluno);

  const turmas = await buscarTurmas();
  carregarTurmas(turmas, aluno.turmaAluno);
};

// Adiciona um listener para o evento de "submit" no formulário de edição de aluno
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtém os dados do formulário
  const idEditar = recuperarId();
  const nomeAluno = formulario.elements['nome'].value;
  const emailAluno = formulario.elements['email'].value;
  const turmaAluno = formulario.elements['turma'].value;

  // Cria o objeto com os dados do aluno a serem editados
  const aluno = {
    nomeAluno,
    emailAluno,
    turmaAluno
  };

  // Envia os dados editados do aluno para a API
  await editarAluno(idEditar, aluno);

  // Redireciona para a página de listagem de alunos após a edição
  window.location = './alunos.html';
});

// Chama a função para carregar os dados do aluno a ser editado e as turmas disponíveis ao carregar a página
carregarDadosEditar();