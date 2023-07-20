const setaVoltar = () => {
    window.location = "./mentores.html"
}

const formulario = document.getElementById('formulario')

const recuperarId = () => {
    const parametros = window.location.search
    const parametrosObjeto = new URLSearchParams(parametros)
    const id = parametrosObjeto.get('id')

    return id
}

const buscarMentor = async (id) => {
    const resultado = await fetch(`http://localhost:3000/mentores/${id}`)
    const mentor = await resultado.json()

    return mentor
}

const carregarDadosFormulario = (mentor) => {
    document.getElementById('nome').value = mentor.nome
    document.getElementById('email').value = mentor.email
}

const editarMentor = async (id, mentor) => {
    await fetch(`http://localhost:3000/mentores/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
}

const carregarDadosEditar = async () => {

    idEditar = recuperarId()

    const mentor = await buscarMentor(idEditar)

    carregarDadosFormulario(mentor)
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value

    const mentor = {
        nome,
        email
    }

    await editarMentor(idEditar, mentor)

    window.location = './mentores.html'
})

carregarDadosEditar()