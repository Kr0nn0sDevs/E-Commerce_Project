document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-registro');
  const terminos = document.getElementById('terminos');
  const btnSubmit = document.getElementById('btn-submit');
  const mensaje = document.getElementById('mensaje-registro');
  
  if (!form) return;

  const inputs = form.querySelectorAll('input:not([type="checkbox"])');

  terminos.addEventListener('change', () => {
    btnSubmit.disabled = !terminos.checked;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let completo = true;
    inputs.forEach(input => {
      if (input.value.trim() === '') {
        completo = false;
      }
    });

    if (!completo) {
      mensaje.textContent = 'Por favor, completa todos los campos.';
      mensaje.style.color = 'red';
      return;
    }

    const emailInput = document.getElementById('email');
    if (!emailInput.checkValidity()) {
      mensaje.textContent = 'Por favor, ingresa un correo electrónico válido.';
      mensaje.style.color = 'red';
      return;
    }

    mensaje.textContent = '¡Registro completado con éxito!';
    mensaje.style.color = 'green';
    form.reset();
    btnSubmit.disabled = true;
  });
});
