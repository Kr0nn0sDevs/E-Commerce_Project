// Catálogo: el contador del menú y el mensaje son solo demostración (no se guarda nada)
let agregados = 0;
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");
let temporizador;

document.querySelectorAll(".btn-agregar").forEach((btn) => {
  btn.addEventListener("click", () => {
    agregados++;
    contador.textContent = agregados;
    mensaje.textContent = `"${btn.dataset.nombre}" se agregó al carrito.`;
    mensaje.hidden = false;
    clearTimeout(temporizador);
    temporizador = setTimeout(() => (mensaje.hidden = true), 2500);
  });
});
