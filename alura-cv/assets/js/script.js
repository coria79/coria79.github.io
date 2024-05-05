document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const submitButton = document.querySelector('.main_section_contact_button');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Avoid to send the form befero validations.
        validateForm();
    });

    function validateForm() {
        let isValid = true;

        // Name validation.
        if (nameInput.value.trim() === '' || nameInput.value.length > 50) {
            document.getElementById('nameError').textContent = 'El nombre no puede estar vacío. Debe tener menos de 50 caracteres.';
            isValid = false;
        } else {
            document.getElementById('nameError').textContent = '';
        }

        // Email validation.
        if (emailInput.value.trim() === '' || !emailInput.value.includes('@') || !emailInput.value.includes('.')) {
            document.getElementById('emailError').textContent = 'Ingrese un correo electrónico válido (ejemplo: texto@texto.com).';
            isValid = false;
        } else {
            document.getElementById('emailError').textContent = '';
        }

        // Subject validation.
        if (subjectInput.value.trim() === '' || subjectInput.value.length > 50) {
            document.getElementById('subjectError').textContent = 'El asunto no puede estar vacío. Debe tener menos de 50 caracteres.';
            isValid = false;
        } else {
            document.getElementById('subjectError').textContent = '';
        }

        // Message validation.
        if (messageTextarea.value.trim() === '' || messageTextarea.value.length > 300) {
            document.getElementById('messageError').textContent = 'El mensaje no puede estar vacío. Debe tener menos de 300 caracteres.';
            isValid = false;
        } else {
            document.getElementById('messageError').textContent = '';
        }

        if (isValid) {
            // form.submit(); // This is how the form should be sent.
                    
            // Fields cleanup.
            nameInput.value = '';
            emailInput.value = '';
            subjectInput.value = '';
            messageTextarea.value = '';
            
            // Pop up simulated message.
            alert("Correo enviado");

            // Reload the form.
            window.location.reload();
        }
    }
});
