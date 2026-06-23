const API_URL = "http://localhost:3000/api";

async function fetchProductos() {
    const response = await fetch(`${API_URL}/products`);
    const datos = await response.json();
    return datos.data;
}

async function createSale(nombre_usuario, fecha, precio_total) {
    const response = await fetch(`${API_URL}/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_usuario, fecha, precio_total })
    });
    return await response.json();
}
