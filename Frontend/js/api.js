// URL base del backend
const API_URL = "http://localhost:3000/api";

// Trae todos los productos
async function fetchProductos() {
    const response = await fetch(`${API_URL}/products`);
    const datos = await response.json();
    return datos.payload;
}


