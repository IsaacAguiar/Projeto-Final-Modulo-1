const setaVoltar = () => {
    window.location = "./turmas.html";
}

function preencherMentorias() {
    // Função para preencher o dropdown de mentorias com os títulos das mentorias disponíveis
    fetch('https://api-projetofinal-md1.onrender.com/Mentorias')
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta da rede não foi bem-sucedida');
            }
            return response.json();
        })
        .then(data => {
            // Obtém a referência do elemento select para as mentorias
            const selectMentoria = document.getElementById('mentoria');
            data.forEach(mentoria => {
                // Cria um elemento option para cada mentoria e adiciona-o ao select
                const option = document.createElement('option');
                option.text = mentoria.titulo;
                selectMentoria.add(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar Mentorias:', error);
        });
}

function preencherMentores() {
    // Função para preencher o dropdown de mentores com os nomes dos mentores disponíveis
    fetch('https://api-projetofinal-md1.onrender.com/Mentores')
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta da rede não foi bem-sucedida');
            }
            return response.json();
        })
        .then(data => {
            // Obtém a referência do elemento select para os mentores
            const selectMentor = document.getElementById('mentor');
            data.forEach(mentor => {
                // Cria um elemento option para cada mentor e adiciona-o ao select
                const option = document.createElement('option');
                option.text = mentor.nome;
                selectMentor.add(option);
            })
        })
        .catch(error => {
            console.error('Erro ao buscar Mentores:', error);
        })
}

document.addEventListener('DOMContentLoaded', function() {
    // Evento que é disparado quando a página é carregada, chama as funções para preencher os dropdowns
    preencherMentorias();
    preencherMentores();
});

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('formulario'));
    const formDataObj = Object.fromEntries(formData.entries());

    // Unindo a hora de inicio e a hora de fim em um único campo
    formDataObj.horario = formDataObj.horaInicio + " - " + formDataObj.horaFim;
    delete formDataObj.horaInicio;
    delete formDataObj.horaFim;

    fetch('https://api-projetofinal-md1.onrender.com/Turmas', {
        method: 'POST',
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataObj)
    })
    .then(response => {
        if (response.ok) {
            // Se a requisição foi bem-sucedida, redireciona o usuário para a página de turmas
            setaVoltar();
        } else {
            // Se houve algum erro, exibe uma mensagem de erro
            alert('Erro ao criar turma!');
        }
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
    });
});