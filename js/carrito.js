// Carrito de demostración: sin persistencia de datos
const lista = document.getElementById("lista-carrito");
const vacio = document.getElementById("carrito-vacio");
const contenido = document.getElementById("carrito-contenido");
const totalEl = document.getElementById("total");
const compraOk = document.getElementById("compra-ok");

const dinero = (n) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

// Recalcula subtotales y total
function recalcular() {
  let total = 0;
  const filas = lista.querySelectorAll("tr");
  filas.forEach((fila) => {
    const precio = Number(fila.dataset.precio);
    const cantidad = parseInt(fila.querySelector(".cantidad").value, 10) || 0;
    fila.querySelector(".subtotal").textContent = dinero(precio * cantidad);
    total += precio * cantidad;
  });
  totalEl.textContent = dinero(total);
  vacio.hidden = filas.length > 0;
  contenido.hidden = filas.length === 0;
}

// Solo números (máx. 2 dígitos) y recálculo inmediato
lista.addEventListener("input", (e) => {
  if (!e.target.classList.contains("cantidad")) return;
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 2);
  recalcular();
});

// Si el campo queda vacío o en 0, se regresa a 1
lista.addEventListener("focusout", (e) => {
  if (!e.target.classList.contains("cantidad")) return;
  if (!parseInt(e.target.value, 10)) e.target.value = "1";
  recalcular();
});

lista.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-quitar")) return;
  e.target.closest("tr").remove();
  recalcular();
});

document.getElementById("btn-vaciar").addEventListener("click", () => {
  lista.innerHTML = "";
  recalcular();
});

document.getElementById("btn-comprar").addEventListener("click", () => {
  lista.innerHTML = "";
  recalcular();
  compraOk.hidden = false;
});

recalcular();
