window.addEventListener("DOMContentLoaded", () => {
    const ticketData = JSON.parse(localStorage.getItem("ticket"));

    if (!ticketData) {
        document.getElementById("contenedor-ticket").innerHTML = "<p>No hay ticket para mostrar.</p>";
        return;
    }

    document.getElementById("ticket-nombre").textContent = ticketData.nombre_usuario;
    document.getElementById("ticket-fecha").textContent = ticketData.fecha;

    const tbody = document.getElementById("ticket-items");
    ticketData.items.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio}</td>
                <td>$${item.precio * item.cantidad}</td>
            </tr>
        `;
    });

    document.getElementById("ticket-total").textContent = `Total: $${ticketData.precio_total}`;

    localStorage.removeItem("ticket");

    document.getElementById("btn-continuar").addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.href = "index.html";
    });
});
