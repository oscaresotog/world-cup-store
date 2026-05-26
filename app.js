let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contadorCarrito = document.getElementById("contador-carrito");
const botonesCarrito = document.querySelectorAll(".btn-agregar-carrito");

botonesCarrito.forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = {
      id: boton.dataset.id,
      nombre: boton.dataset.nombre,
      precio: Number(boton.dataset.precio),
      imagen: boton.dataset.imagen,
      cantidad: 1,
    };
    const productoExistente = carrito.find((item) => item.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push(producto);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    boton.innerHTML = `<i class="bi bi-check-circle"></i> Agregado`;
    setTimeout(() => {
      boton.innerHTML = `<i class="bi bi-cart-plus"></i> Agregar al carrito`;
    }, 1500);
  });
});

function actualizarContador() {
  if (!contadorCarrito) return;
  const totalProductos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  );
  contadorCarrito.textContent = totalProductos;
}

function mostrarCarrito() {
  const contenedor = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  if (!contenedor) return;
  contenedor.innerHTML = "";
  let total = 0;
  if (carrito.length === 0) {
    contenedor.innerHTML = `
            <div class="alert alert-info">
                Tu carrito está vacío.
            </div>
        `;
    if (totalElemento) {
      totalElemento.textContent = "0";
    }
    return;
  }

  carrito.forEach((producto) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    contenedor.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5>${producto.nombre}</h5>
                    <p>
                        Precio: $${producto.precio}
                    </p>
                    <p>
                        Cantidad: ${producto.cantidad}
                    </p>
                    <p>
                        Subtotal: $${subtotal}
                    </p>
                    <button
                        class="btn btn-outline-danger"
                        onclick="eliminarProducto('${producto.id}')">
                        Eliminar
                    </button>

                </div>
            </div>
        `;
  });

  if (totalElemento) {
    totalElemento.textContent = total;
  }
}

function eliminarProducto(id) {
  carrito = carrito.filter((producto) => producto.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarContador();
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
  mostrarCarrito();
});
