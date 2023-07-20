const rotuloEmail = document.getElementById('rotuloEmail')
const entradaEmail = document.getElementById('entradaEmail') 
const rotuloSenha = document.getElementById('rotuloSenha')
const entradaSenha = document.getElementById('entradaSenha')
const mensagemErroEmail = document.getElementById('mensagemErroEmail');
const mensagemErroSenha = document.getElementById('mensagemErroSenha');

entradaEmail.addEventListener('input', () => {
    if (entradaEmail.value !== "") {
        rotuloEmail.style.color = "rgba(0, 194, 71, 1)";
        entradaEmail.style.border = "1px solid rgba(0, 194, 71, 1)";
        mensagemErroEmail.style.display = "none"; 
    } else {
        rotuloEmail.style.color = ""; 
        entradaEmail.style.border = "";
        mensagemErroEmail.style.display = "block"; 
    }
});

entradaSenha.addEventListener('input', () => {
    if (entradaSenha.value !== "") {
        rotuloSenha.style.color = "rgba(0, 194, 71, 1)";
        entradaSenha.style.border = "1px solid rgba(0, 194, 71, 1)";
        mensagemErroSenha.style.display = "none"; 
    } else {
        rotuloSenha.style.color = "";
        entradaSenha.style.border = "";
        mensagemErroSenha.style.display = "block"; 
    }
});

const entrar = () => {
    const email = entradaEmail.value.trim();
    const senha = entradaSenha.value.trim();
    
    if (email === "") {
        mensagemErroEmail.style.display = "block";
    } else {
        mensagemErroEmail.style.display = "none";
    }
    
    if (senha === "") {
        mensagemErroSenha.style.display = "block"; 
    } else {
        mensagemErroSenha.style.display = "none"; 
    }
    
    if (email !== "" && senha !== "") {
        window.location = "../Mentores/mentores.html";
    }
}
