const actualizarContador = () => {
  const span = document.getElementById('cart-counter');
  if (!span) return;
  try {
    const carrito = JSON.parse(localStorage.getItem("techhub_carrito")) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    span.textContent = `(${totalItems})`;
  } catch (e) {
    span.textContent = '(0)';
  }
};

document.addEventListener('DOMContentLoaded', actualizarContador);

window.actualizarContador = actualizarContador;
