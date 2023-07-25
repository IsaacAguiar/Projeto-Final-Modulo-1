const setaVoltar = () => {
    window.location = "./mentorias.html";
}

const formulario = document.getElementById('formulario');
const selectMentor = document.getElementById('mentor');

const recuperarId = () => {
    const parametros = window.location.search;
    const parametrosObjeto = new URLSearchParams(parametros);
    const id = parametrosObjeto.get('id');
    return id;
};

const buscarMentoria = async (id) => {
    const resultado = await fetch(`http://localhost:3000/Mentorias/${id}`);
    const mentoria = await resultado.json();
    return mentoria;
};

const buscarMentores = async () => {
    const resultado = await fetch('http://localhost:3000/Mentores');
    const mentores = await resultado.json();

    return mentores;
};

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

const editarMentoria = async (id, mentoria) => {
    await fetch(`http://localhost:3000/Mentorias/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentoria)
    });
};

const carregarDadosEditar = async () => {
    const idEditar = recuperarId();

    const mentoria = await buscarMentoria(idEditar);
    const mentores = await buscarMentores();

    carregarDadosFormulario(mentoria, mentores);
};

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = formulario.elements['titulo'].value;
    const mentor = formulario.elements['mentor'].value;
    const status = formulario.elements['status'].checked ? 'Ativo' : 'Inativo';

    const mentoria = {
        titulo,
        mentor,
        status
    };

    const idEditar = recuperarId();
    await editarMentoria(idEditar, mentoria);

    window.location = '../Mentorias/mentorias.html';
});

carregarDadosEditar();