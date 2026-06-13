// Middleware de ruta para filtrar ids no validos
const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            error: "El ID debe ser un numero entero positivo"
        });
    }

    const parsedId = parseInt(id, 10);

    if (parsedId === 0) {
        return res.status(400).json({
            error: "El id debe ser mayor a 0"
        });
    }

    req.id = parsedId;

    next(); // Pasamos al siguiente middleware o a la respuesta
};

export default validateId;
