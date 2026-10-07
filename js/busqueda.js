// Búsqueda: muestra el texto escrito y los productos ficticios que ya están en busqueda.html
const form = document.getElementById("form-busqueda");
const campo = document.getElementById("input-busqueda");
const area = document.getElementById("area-resultados");
const titulo = document.getElementById("texto-resultados");
const grid = area.querySelector(".productos");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = campo.value.trim();
  area.hidden = false;

  if (texto === "") {
    titulo.textContent = "Escribe un texto para buscar.";
    grid.hidden = true;
    return;
  }

  titulo.textContent = "Resultados para la búsqueda de " + texto; // textContent evita inyectar HTML
  grid.hidden = false;
});
