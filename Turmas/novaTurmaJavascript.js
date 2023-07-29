const setaVoltar = () => {
    window.location = "./turmas.html";
}

function preencherMentorias() {
    fetch('https://api-projetofinal-md1.onrender.com/Mentorias')
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta da rede não foi bem-sucedida');
            }
            return response.json();
        })
        .then(data => {
            const selectMentoria = document.getElementById('mentoria');
            data.forEach(mentoria => {
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
    fetch('https://api-projetofinal-md1.onrender.com/Mentores')
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta da rede não foi bem-sucedida');
            }
            return response.json();
        })
        .then(data => {
            const selectMentor = document.getElementById('mentor');
            data.forEach(mentor => {
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
            setaVoltar();
        } else {
            alert('Erro ao criar turma!');
        }
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
    });
});