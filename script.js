
const productos = [
  { id: 1, nombre: "Camiseta", precio: 35.00 },
  { id: 2, nombre: "Pantalón", precio: 50.00 },
  { id: 3, nombre: "Zapatos", precio: 80.00 },
  { id: 4, nombre: "Gorra", precio: 20.00 },
  { id: 5, nombre: "Mochila", precio: 60.00 },
];

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");

function mostrarProductos() {
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = \`
      <h3>\${prod.nombre}</h3>
      <p>Precio: $\${prod.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(\${prod.id})">Agregar al carrito</button>
    \`;
    contenedorProductos.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = \`\${item.nombre} x\${item.cantidad} - $\${(item.precio * item.cantidad).toFixed(2)}\`;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });
  totalCarrito.textContent = total.toFixed(2);
}

function vaciarCarrito() {
  carrito.length = 0;
  actualizarCarrito();
  localStorage.removeItem("carrito");
}

function realizarCompra(event) {
  event.preventDefault();

  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  const resumen = carrito.map(item => \`\${item.nombre} x\${item.cantidad}\`).join(", ");
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);

  alert(\`🎉 Gracias, \${nombre}! Hemos recibido tu compra de: \${resumen}. Total: $\${total}\nConfirmación enviada a: \${correo}\`);

  carrito.length = 0;
  actualizarCarrito();
  localStorage.removeItem("carrito");
  event.target.reset();
}

window.onload = function () {
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    const data = JSON.parse(guardado);
    data.forEach(p => carrito.push(p));
    actualizarCarrito();
  }
  mostrarProductos();
};
