const labelEmail = document.getElementById('emailLabel')
const inputEmail = document.getElementById('emailInput') 
const labelSenha = document.getElementById('senhaLabel')
const inputSenha = document.getElementById('senhaInput')

inputEmail.addEventListener('input', () => {
    if (inputEmail.value !== "") {
        labelEmail.style.color = "rgba(0, 194, 71, 1)";
        inputEmail.style.border = "1px solid rgba(0, 194, 71, 1)";
      } else {
        labelEmail.style.color = ""; 
        inputEmail.style.border = "";
      }
});

inputSenha.addEventListener('input', () => {
    if (inputSenha.value !== "") {
        labelSenha.style.color = "rgba(0, 194, 71, 1)";
        inputSenha.style.border = "1px solid rgba(0, 194, 71, 1)"
    } else {
        labelSenha.style.color = "";
        inputSenha.style.border = "";
    }
})

