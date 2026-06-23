function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const tbody = document.getElementById("cuerpo-tabla");
    tbody.innerHTML = "";

    if (carrito.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="carrito-vacio">El carrito está vacío</td></tr>`;
        return;
    }

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        tbody.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>
                    <button class="btn-cantidad" onclick="reducirCantidad(${index})">−</button>
                    ${item.cantidad}
                    <button class="btn-cantidad" onclick="aumentarCantidad(${index})">+</button>
                </td>
                <td>$${item.precio}</td>
                <td>$${subtotal}</td>
                <td><button class="btn-eliminar-item" onclick="eliminarItem(${index})">X</button></td>
            </tr>
        `;
    });
}

function calcularTotal() {
    const carrito = obtenerCarrito();
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    document.getElementById("total").textContent = `Total: $${total}`;
}

function aumentarCantidad(index) {
    const carrito = obtenerCarrito();
    carrito[index].cantidad++;
    guardarCarrito(carrito);
    renderizarCarrito();
    calcularTotal();
}

function reducirCantidad(index) {
    const carrito = obtenerCarrito();
    carrito[index].cantidad--;
    if (carrito[index].cantidad === 0) carrito.splice(index, 1);
    guardarCarrito(carrito);
    renderizarCarrito();
    calcularTotal();
}

function eliminarItem(index) {
    const carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    renderizarCarrito();
    calcularTotal();
}

function limpiarCarrito() {
    if (obtenerCarrito().length === 0) {
        alert("El carrito ya está vacío");
        return;
    }
    localStorage.removeItem("carrito");
    renderizarCarrito();
    calcularTotal();
}

async function confirmarCompra() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const nombre_usuario = localStorage.getItem("usuario") || "Invitado";
    const fecha = new Date().toISOString().split("T")[0];
    const precio_total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    try {
        const resultado = await createSale(nombre_usuario, fecha, precio_total);

        if (!resultado.error) {
            localStorage.setItem("ticket", JSON.stringify({ nombre_usuario, fecha, precio_total, items: carrito }));
            localStorage.removeItem("carrito");
            window.location.href = "ticket.html";
        } else {
            alert("Error al confirmar la compra: " + resultado.message);
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor. Verificá que el backend esté corriendo.");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
    calcularTotal();
    document.getElementById("btn-limpiar").addEventListener("click", limpiarCarrito);
    document.getElementById("btn-confirmar").addEventListener("click", confirmarCompra);
});
