// Captura dos elementos do formulário e mensagens de erro
const rotuloEmail = document.getElementById('rotuloEmail')
const entradaEmail = document.getElementById('entradaEmail')
const rotuloSenha = document.getElementById('rotuloSenha')
const entradaSenha = document.getElementById('entradaSenha')
const mensagemErroEmail = document.getElementById('mensagemErroEmail')
const mensagemErroSenha = document.getElementById('mensagemErroSenha')

// Event listener para o campo de email
entradaEmail.addEventListener('input', () => {
    if (entradaEmail.value !== "") {
        // Se o campo de email não estiver vazio, estiliza o rótulo e borda do campo para indicar sucesso
        rotuloEmail.style.color = "rgba(0, 194, 71, 1)";
        entradaEmail.style.border = "1px solid rgba(0, 194, 71, 1)";
        mensagemErroEmail.style.display = "none"; // Oculta a mensagem de erro do campo
    } else {
        // Se o campo de email estiver vazio, remove os estilos de sucesso e exibe a mensagem de erro
        rotuloEmail.style.color = "";
        entradaEmail.style.border = "";
        mensagemErroEmail.style.display = "block";
    }
})

// Event listener para o campo de senha
entradaSenha.addEventListener('input', () => {
    if (entradaSenha.value !== "") {
        // Se o campo de senha não estiver vazio, estiliza o rótulo e borda do campo para indicar sucesso
        rotuloSenha.style.color = "rgba(0, 194, 71, 1)";
        entradaSenha.style.border = "1px solid rgba(0, 194, 71, 1)";
        mensagemErroSenha.style.display = "none"; // Oculta a mensagem de erro do campo
    } else {
        // Se o campo de senha estiver vazio, remove os estilos de sucesso e exibe a mensagem de erro
        rotuloSenha.style.color = "";
        entradaSenha.style.border = "";
        mensagemErroSenha.style.display = "block";
    }
})

// Função para verificar se o formulário foi preenchido corretamente e redirecionar para a próxima página
const entrar = () => {
    const email = entradaEmail.value.trim();
    const senha = entradaSenha.value.trim();

    // Verifica se o campo de email está vazio e exibe a mensagem de erro, caso necessário
    if (email === "") {
        mensagemErroEmail.style.display = "block";
    } else {
        mensagemErroEmail.style.display = "none";
    }

    // Verifica se o campo de senha está vazio e exibe a mensagem de erro, caso necessário
    if (senha === "") {
        mensagemErroSenha.style.display = "block";
    } else {
        mensagemErroSenha.style.display = "none";
    }

    // Se ambos os campos estiverem preenchidos, redireciona para a próxima página
    if (email !== "" && senha !== "") {
        window.location = "../Mentores/mentores.html";
    }
}