const CLAVE = "techhub_carrito";

const leerCarrito = () => {
  try { return JSON.parse(localStorage.getItem(CLAVE)) || []; }
  catch { return []; }
};
const guardarCarrito = (c) => { localStorage.setItem(CLAVE, JSON.stringify(c)); if (window.actualizarContador) window.actualizarContador(); };
const dinero = (n) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

document.querySelectorAll(".btn-agregar").forEach((btn) => {
  btn.addEventListener("click", () => {
    const carrito = leerCarrito();
    const id = btn.dataset.id;
    const existente = carrito.find((p) => p.id === id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({
        id,
        nombre: btn.dataset.nombre,
        precio: Number(btn.dataset.precio),
        img: btn.dataset.img,
        cantidad: 1,
      });
    }
    guardarCarrito(carrito);
    btn.textContent = "¡Agregado!";
    setTimeout(() => (btn.textContent = "Agregar al carrito"), 1000);
  });
});

const lista = document.getElementById("lista-carrito");

if (lista) {
  const vacio = document.getElementById("carrito-vacio");
  const contenido = document.getElementById("carrito-contenido");
  const totalEl = document.getElementById("total");
  const compraOk = document.getElementById("compra-ok");

  const pintar = () => {
    const carrito = leerCarrito();
    vacio.hidden = carrito.length > 0;
    contenido.hidden = carrito.length === 0;

    lista.innerHTML = carrito.map((p) => `
      <tr>
        <td><img class="miniatura" src="${esc(p.img)}" alt=""> ${esc(p.nombre)}</td>
        <td>${dinero(p.precio)}</td>
        <td><input type="number" class="cantidad" min="1" max="99" value="${p.cantidad}" data-id="${esc(p.id)}" aria-label="Cantidad de ${esc(p.nombre)}"></td>
        <td>${dinero(p.precio * p.cantidad)}</td>
        <td><button type="button" class="btn-quitar" data-id="${esc(p.id)}">Quitar</button></td>
      </tr>`).join("");

    totalEl.textContent = dinero(carrito.reduce((s, p) => s + p.precio * p.cantidad, 0));
  };

  lista.addEventListener("input", (e) => {
    if (e.target.classList.contains("cantidad")) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
  });

  lista.addEventListener("change", (e) => {
    if (!e.target.classList.contains("cantidad")) return;
    const carrito = leerCarrito();
    const prod = carrito.find((p) => p.id === e.target.dataset.id);
    const cant = Math.min(99, Math.max(1, parseInt(e.target.value, 10) || 1));
    if (prod) prod.cantidad = cant;
    guardarCarrito(carrito);
    pintar();
  });

  lista.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn-quitar")) return;
    guardarCarrito(leerCarrito().filter((p) => p.id !== e.target.dataset.id));
    pintar();
  });

  document.getElementById("btn-vaciar").addEventListener("click", () => {
    guardarCarrito([]);
    pintar();
  });

  document.getElementById("btn-comprar").addEventListener("click", () => {
    guardarCarrito([]);
    pintar();
    compraOk.hidden = false;
  });

  pintar();
}
