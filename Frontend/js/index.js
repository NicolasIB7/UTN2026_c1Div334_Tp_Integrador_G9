window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-ingresar").addEventListener("click", () => {
        const nombre = document.getElementById("input-nombre").value.trim();

        if (!nombre) {
            alert("Por favor ingresa tu nombre");
            return;
        }

        localStorage.setItem("usuario", nombre);
        window.location.href = "productos.html";
    });
});
