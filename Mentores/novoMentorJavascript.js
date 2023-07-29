const setaVoltar = () => {
    window.location = "./mentores.html"
}

const formulario = document.getElementById('formulario')

const buscarMentores = async () => {
    const resposta = await fetch('https://api-projetofinal-md1.onrender.com/Mentores')
    const mentores = await resposta.json()
    return mentores
}

const cadastrarMentor = async (mentor) => {
    await fetch('https://api-projetofinal-md1.onrender.com/Mentores', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
    window.location = './mentores.html'
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value

    const mentores = await buscarMentores()

    if (mentores.length === 0) {
        console.error('Erro: Não foi possível buscar os mentores.')
        return
    }

    const mentorObjeto = mentores.find(mentor => mentor.nome === nome)

    if (mentorObjeto) {
        console.error('Erro: Mentor já cadastrado.')
        return
    }

    const mentorNovo = {
        nome,
        email
    }

    cadastrarMentor(mentorNovo)
})