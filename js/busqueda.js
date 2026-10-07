document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-busqueda');
  const input = document.getElementById('input-busqueda');
  const areaResultados = document.getElementById('area-resultados');
  const textoResultados = document.getElementById('texto-resultados');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const termino = input.value.trim();

    if (termino !== '') {
      textoResultados.textContent = `Resultados para la búsqueda de "${termino}"`;
      areaResultados.hidden = false;
    } else {
      textoResultados.textContent = 'Por favor ingresa un término de búsqueda.';
      areaResultados.hidden = false;
    }
  });
});
