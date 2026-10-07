// Productos ficticios: no dependen del texto buscado
const productosFicticios = [
  { nombre: "Tarjeta gráfica NovaCore 8 GB", desc: "GDDR6, ideal para juegos y renderizado.", precio: "$7,999.00", img: "img/gpu.svg" },
  { nombre: "SSD M.2 NVMe 1 TB", desc: "Lectura de hasta 3,500 MB/s.", precio: "$1,499.00", img: "img/ssd.svg" },
  { nombre: "Router Wi-Fi 6 AX3000", desc: "Doble banda, 4 puertos Gigabit.", precio: "$1,199.00", img: "img/router.svg" },
  { nombre: "Placa ESP32 DevKit", desc: "Wi-Fi y Bluetooth para proyectos IoT.", precio: "$249.00", img: "img/esp32.svg" }
];

const form = document.getElementById("form-busqueda");
const campo = document.getElementById("texto-busqueda");
const resultados = document.getElementById("resultados");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = campo.value.trim();
  resultados.innerHTML = "";

  if (texto === "") {
    const aviso = document.createElement("p");
    aviso.className = "error";
    aviso.textContent = "Escribe un texto para buscar.";
    resultados.appendChild(aviso);
    return;
  }

  const titulo = document.createElement("h3");
  titulo.textContent = "Resultados para la búsqueda de " + texto; // textContent evita inyectar HTML
  resultados.appendChild(titulo);

  const ul = document.createElement("ul");
  ul.className = "productos";
  ul.innerHTML = productosFicticios.map((p) => `
    <li class="producto">
      <img src="${p.img}" alt="${p.nombre}">
      <div class="producto-info">
        <h3>${p.nombre}</h3>
        <p>${p.desc}</p>
        <span class="precio">${p.precio}</span>
      </div>
    </li>`).join("");
  resultados.appendChild(ul);
});
