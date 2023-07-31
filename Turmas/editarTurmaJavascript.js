const setaVoltar = () => {
    window.location = "../Turmas/turmas.html";
  }
  
// Função para formatar o horário em um formato específico
const formatarHorario = (horaInicio, horaFim) => {
  return `${horaInicio} - ${horaFim}`;
}

// Função para recuperar o ID da turma a ser editada a partir dos parâmetros da URL
const recuperarId = () => {
  const parametros = window.location.search;
  const parametrosObjeto = new URLSearchParams(parametros);
  const id = parametrosObjeto.get('id');
  return id;
}

// Função assíncrona para buscar os dados da turma a ser editada
const buscarTurma = async (id) => {
  const resposta = await fetch(`https://api-projetofinal-md1.onrender.com/Turmas/${id}`);
  const turma = await resposta.json();

  // Buscar a mentoria correspondente pelo título
  const mentorias = await buscarMentorias();
  const mentoria = mentorias.find(item => item.titulo === turma.mentoria);

  // Adicionar a mentoria à turma
  turma.mentoriaObj = mentoria;

  return turma;
}

// Função assíncrona para buscar a lista de mentores
const buscarMentores = async () => {
  const resposta = await fetch('https://api-projetofinal-md1.onrender.com/Mentores');
  const mentores = await resposta.json();
  return mentores;
}

// Função assíncrona para buscar a lista de mentorias
const buscarMentorias = async () => {
  const resposta = await fetch('https://api-projetofinal-md1.onrender.com/Mentorias');
  const mentorias = await resposta.json();
  return mentorias;
}

// Função para carregar os dados do formulário com os dados da turma a ser editada
const carregarDadosFormulario = async (turma, mentores, mentorias) => {
  // Preencher os campos do formulário com os dados da turma
  document.getElementById('turma').value = turma.turma;
  document.getElementById('titulo').value = turma.titulo;
  document.getElementById('encontros').value = turma.encontros;
  document.getElementById('dataInicio').value = turma.dataInicio;
  document.getElementById('dataSemana').value = turma.dataSemana;

  const [horaInicio, horaFim] = turma.horario.split(' - ');
  document.getElementById('horaInicio').value = horaInicio;
  document.getElementById('horaFim').value = horaFim;

// Preencher o dropdown de mentores com os mentores disponíveis
const mentorSelect = document.getElementById('mentor');
  mentorSelect.innerHTML = '';
  for (const mentor of mentores) {
      const option = document.createElement('option');
      option.value = mentor.nome;
      option.textContent = mentor.nome;
      if (mentor.nome === turma.mentor) {
          option.selected = true;
      }
      mentorSelect.appendChild(option);
  }

// Preencher o dropdown de mentorias com as mentorias disponíveis
const mentoriaSelect = document.getElementById('mentoria');
  mentoriaSelect.innerHTML = '';
  for (const mentoria of mentorias) {
      const option = document.createElement('option');
      option.value = mentoria.titulo;
      option.textContent = mentoria.titulo;
      if (mentoria.titulo === turma.mentoria) {
          option.selected = true;
      }
      mentoriaSelect.appendChild(option);
  }
}

// Função assíncrona para carregar os dados da turma a ser editada e os dados dos dropdowns
const carregarDadosEditar = async () => {
  const idEditar = recuperarId();
  const turma = await buscarTurma(idEditar);
  const mentores = await buscarMentores();
  const mentorias = await buscarMentorias();
  carregarDadosFormulario(turma, mentores, mentorias);
}

// Função assíncrona para salvar a edição da turma

const salvarEdicao = async () => {
    const idEditar = recuperarId();
    const mentor = document.getElementById('mentor').value;
    const turma = document.getElementById('turma').value;
    const titulo = document.getElementById('titulo').value;
    const encontros = document.getElementById('encontros').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataSemana = document.getElementById('dataSemana').value;
    const horaInicio = document.getElementById('horaInicio').value;
    const horaFim = document.getElementById('horaFim').value;
    const mentoria = document.getElementById('mentoria').value;
  
    const horario = formatarHorario(horaInicio, horaFim);
  
    const turmaEditada = {
      mentor,
      turma,
      titulo,
      encontros,
      dataInicio,
      dataSemana,
      horario,
      mentoria
    };
  
    await editarTurma(idEditar, turmaEditada);
    window.location = '../Turmas/turmas.html';
}
  
// Função assíncrona para fazer a requisição PUT para editar a turma
const editarTurma = async (id, turma) => {
  await fetch(`https://api-projetofinal-md1.onrender.com/Turmas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(turma)
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const elementoInput = document.getElementById("barradePesquisa");
  if (elementoInput) {
    elementoInput.addEventListener("input", buscarTurmas);
  }

  carregarDadosEditar();
});