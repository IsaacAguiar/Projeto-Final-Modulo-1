const novaMentoria = () => {
    window.location= "./novaMentoria.html"
}

const editarMentoria = (mentoriaId) => {
    window.location = `./editarMentoria.html?id=${mentoriaId}`;
};

// Função que exibe as mentorias na tabela
const mostrarMentorias = (mentorias) => {
    const tabelaCorpo = document.getElementById('tabelaCorpo');
    tabelaCorpo.innerHTML = ''; 

    mentorias.forEach((mentoria) => {
        const statusClasse = mentoria.status === "Ativo" ? "status-ativo" : "status-inativo";
        
        const mentoriaHtml = `
            <tr style="border: 0px none; border-radius: 8px;">
                <td>${mentoria.titulo}</td>
                <td>${mentoria.mentor}</td>
                <td><div class="${statusClasse}">${mentoria.status}</div></td>
                <td><svg onclick="editarMentoria(${mentoria.id})" class="botoesFormulario" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.204 10.796L19 9C19.5453 8.45475 19.8179 8.18213 19.9636 7.88803C20.2409 7.32848 20.2409 6.67153 19.9636 6.11197C19.8179 5.81788 19.5453 5.54525 19 5C18.4548 4.45475 18.1821 4.18213 17.888 4.03639C17.3285 3.75911 16.6715 3.75911 16.112 4.03639C15.8179 4.18213 15.5453 4.45475 15 5L13.1814 6.81866C14.1452 8.46926 15.5314 9.84482 17.204 10.796ZM11.7269 8.27312L4.8564 15.1436C4.43134 15.5687 4.21881 15.7812 4.07907 16.0423C3.93934 16.3034 3.88039 16.5981 3.7625 17.1876L3.1471 20.2646C3.08058 20.5972 3.04732 20.7635 3.14193 20.8581C3.23654 20.9527 3.40284 20.9194 3.73545 20.8529L6.81243 20.2375C7.40189 20.1196 7.69661 20.0607 7.95771 19.9209C8.21881 19.7812 8.43134 19.5687 8.8564 19.1436L15.7458 12.2542C14.1241 11.2386 12.7524 9.87628 11.7269 8.27312Z" fill="#004CE8"/>
                </svg>
                <svg onclick="excluirMentoria('${mentoria.id}')" class="botoesFormulario" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5C3.75 4.58579 4.08579 4.25 4.5 4.25H19.5C19.9142 4.25 20.25 4.58579 20.25 5V22C20.25 22.4142 19.9142 22.75 19.5 22.75H4.5C4.08579 22.75 3.75 22.4142 3.75 22V5ZM5.25 5.75V21.25H18.75V5.75H5.25Z" fill="#FF3333"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.25C10.4142 9.25 10.75 9.58579 10.75 10V16.5C10.75 16.9142 10.4142 17.25 10 17.25C9.58579 17.25 9.25 16.9142 9.25 16.5V10C9.25 9.58579 9.58579 9.25 10 9.25Z" fill="#FF3333"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 9.25C14.4142 9.25 14.75 9.58579 14.75 10V16.5C14.75 16.9142 14.4142 17.25 14 17.25C13.5858 17.25 13.25 16.9142 13.25 16.5V10C13.25 9.58579 13.5858 9.25 14 9.25Z" fill="#FF3333"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 5C1.25 4.58579 1.58579 4.25 2 4.25H22C22.4142 4.25 22.75 4.58579 22.75 5C22.75 5.41421 22.4142 5.75 22 5.75H2C1.58579 5.75 1.25 5.41421 1.25 5Z" fill="#FF3333"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.98683 1.63949C9.11849 1.39931 9.3706 1.25 9.6445 1.25H14.3885C14.6647 1.25 14.9186 1.40179 15.0493 1.6451L16.6607 4.6451C16.7856 4.87753 16.7791 5.15847 16.6437 5.38492C16.5083 5.61136 16.2638 5.75 16 5.75H8C7.73502 5.75 7.4897 5.61017 7.35468 5.38217C7.21965 5.15418 7.21496 4.87185 7.34233 4.63949L8.98683 1.63949ZM10.0887 2.75L9.26642 4.25H14.7458L13.9401 2.75H10.0887Z" fill="#FF3333"/>
                </svg>
                </td>
            </tr>
        `;

        tabelaCorpo.innerHTML += mentoriaHtml; 
    });
};

// Função assíncrona para obter todas as mentorias
const pegarMentorias = async () => {
    try {
        const apiResponse = await fetch('https://api-projetofinal-md1.onrender.com/Mentorias');
        const mentorias = await apiResponse.json();
        mostrarMentorias(mentorias);
    } catch (error) {
        console.error('Erro ao buscar mentorias:', error);
    }
};

// Função assíncrona para excluir uma mentoria pelo ID
const excluirMentoria = async (id) => {
    await fetch(`https://api-projetofinal-md1.onrender.com/Mentorias/${id}`, { method: 'DELETE' });
    pegarMentorias();
};

// Função assíncrona para buscar e exibir mentorias filtradas na tabela
const buscarMentorias = async () => {
    const entrada = document.getElementById("barradePesquisa");
    const consulta = entrada.value.toLowerCase();

    try {
        const respostaApi = await fetch("https://api-projetofinal-md1.onrender.com/Mentorias");
        const mentorias = await respostaApi.json();

        const mentoriasFiltradas = mentorias.filter(
            (mentoria) =>
            mentoria.titulo.toLowerCase().includes(consulta) ||
            mentoria.mentor.toLowerCase().includes(consulta) ||
            mentoria.status.toLowerCase().includes(consulta)
        );

        mostrarMentorias(mentoriasFiltradas);
    } catch (erro) {
        console.error("Erro ao buscar mentorias:", erro);
    }
};

// Adiciona um evento de input ao campo de pesquisa para buscar mentorias
const elementoInput = document.getElementById("barradePesquisa");
elementoInput.addEventListener("input", buscarMentorias);

// Chama a função para exibir todas as mentorias ao carregar a página
pegarMentorias();