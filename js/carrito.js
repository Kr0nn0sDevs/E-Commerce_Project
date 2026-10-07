// Carrito TechHub: sirve para el catálogo, la búsqueda y la página del carrito.
// Los datos se guardan en localStorage para que el contador del menú funcione en todas las páginas.
const CLAVE = "techhub_carrito";

const leerCarrito = () => {
  try { return JSON.parse(localStorage.getItem(CLAVE)) || []; }
  catch { return []; }
};
const guardarCarrito = (c) => {
  localStorage.setItem(CLAVE, JSON.stringify(c));
  if (window.actualizarContador) window.actualizarContador();
};
const dinero = (n) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Botones "Agregar al carrito" (catálogo y búsqueda) ---------- */
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

/* ---------- Página del carrito ---------- */
const lista = document.getElementById("lista-carrito");

if (lista) {
  const vacio = document.getElementById("carrito-vacio");
  const contenido = document.getElementById("carrito-contenido");
  const totalEl = document.getElementById("total");
  const compraOk = document.getElementById("compra-ok");

  // Primera visita: se cargan productos de ejemplo para poder probar las cantidades
  if (localStorage.getItem(CLAVE) === null) {
    guardarCarrito([
      { id: "ssd", nombre: "SSD M.2 NVMe 1 TB", precio: 1499, img: "img/ssd.jpg", cantidad: 1 },
      { id: "ram", nombre: "Memoria RAM DDR5 16 GB", precio: 1299, img: "img/ram.jpg", cantidad: 2 },
      { id: "router", nombre: "Router Wi-Fi 6 AX3000", precio: 1199, img: "img/router.jpg", cantidad: 1 },
    ]);
  }

  // Recalcula subtotales y total leyendo los inputs (no vuelve a dibujar la tabla)
  const recalcular = () => {
    let total = 0;
    lista.querySelectorAll("tr").forEach((fila) => {
      const cantidad = parseInt(fila.querySelector(".cantidad").value, 10) || 0;
      const subtotal = Number(fila.dataset.precio) * cantidad;
      fila.querySelector(".subtotal").textContent = dinero(subtotal);
      total += subtotal;
    });
    totalEl.textContent = dinero(total);
  };

  // Dibuja la tabla desde lo guardado
  const pintar = () => {
    const carrito = leerCarrito();
    vacio.hidden = carrito.length > 0;
    contenido.hidden = carrito.length === 0;
    lista.innerHTML = carrito.map((p) => `
      <tr data-id="${esc(p.id)}" data-precio="${Number(p.precio)}">
        <td><img class="miniatura" src="${esc(p.img)}" alt=""> ${esc(p.nombre)}</td>
        <td>${dinero(p.precio)}</td>
        <td><input type="text" class="cantidad" inputmode="numeric" maxlength="2" value="${Number(p.cantidad)}" aria-label="Cantidad de ${esc(p.nombre)}"></td>
        <td class="subtotal"></td>
        <td><button type="button" class="btn-quitar" data-id="${esc(p.id)}">Quitar</button></td>
      </tr>`).join("");
    recalcular();
  };

  // Guarda en localStorage las cantidades válidas (>= 1)
  const guardarCantidades = () => {
    const carrito = leerCarrito();
    lista.querySelectorAll("tr").forEach((fila) => {
      const cant = parseInt(fila.querySelector(".cantidad").value, 10);
      const prod = carrito.find((p) => p.id === fila.dataset.id);
      if (prod && cant >= 1) prod.cantidad = cant;
    });
    guardarCarrito(carrito);
  };

  // Solo números (máx. 2 dígitos) y recálculo inmediato
  lista.addEventListener("input", (e) => {
    if (!e.target.classList.contains("cantidad")) return;
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 2);
    recalcular();
    guardarCantidades();
  });

  // Si queda vacío o en 0, se regresa a 1
  lista.addEventListener("focusout", (e) => {
    if (!e.target.classList.contains("cantidad")) return;
    if (!parseInt(e.target.value, 10)) e.target.value = "1";
    recalcular();
    guardarCantidades();
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
