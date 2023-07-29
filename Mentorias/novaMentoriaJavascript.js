const setaVoltar = () => {
    window.location = "./mentorias.html";
}

const formulario = document.getElementById("formulario");
const mentorSelect = document.getElementById("mentor");

const buscarMentores = async () => {
    const resposta = await fetch("https://api-projetofinal-md1.onrender.com/Mentores");
    const mentores = await resposta.json();
    return mentores;
}

const cadastrarMentoria = async (mentoria) => {
    await fetch("https://api-projetofinal-md1.onrender.com/Mentorias", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mentoria)
    });
    window.location = "./mentorias.html";
}

const popularSelectMentores = async () => {
    const mentores = await buscarMentores();
    mentorSelect.innerHTML = '<option value="" disabled selected>Selecione um Mentor</option>';
    mentores.forEach((mentor) => {
        const option = document.createElement("option");
        option.value = mentor.nome;
        option.textContent = mentor.nome;
        mentorSelect.appendChild(option);
    });
}

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = formulario.elements["titulo"].value;
    const nomeMentor = formulario.elements["mentor"].value;
    const statusAtivo = formulario.elements["status"].checked;

    const mentores = await buscarMentores();

    const mentorObjeto = mentores.find((mentor) => mentor.nome === nomeMentor);

    if (!mentorObjeto) {
        console.error("Erro: Mentor selecionado não existe.");
        return;
    }

    const status = statusAtivo ? "Ativo" : "Inativo";

    const mentoriaNova = {
        titulo,
        mentor: nomeMentor,
        status
    };

    cadastrarMentoria(mentoriaNova);
})

popularSelectMentores();