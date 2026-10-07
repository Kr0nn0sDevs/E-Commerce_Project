
const boton = document.getElementById("btn-mision");
const mision = document.getElementById("mision");

if (boton && mision) {
  boton.addEventListener("click", () => {
    const oculto = mision.hidden;
    mision.hidden = !oculto;
    boton.setAttribute("aria-expanded", String(oculto));
    boton.textContent = oculto ? "Ocultar nuestra misión" : "Ver nuestra misión";
  });
}
