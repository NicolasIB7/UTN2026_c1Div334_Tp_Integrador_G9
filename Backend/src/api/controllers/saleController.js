import connection from "../database/db.js";


// GET all sales
export const getSales = async (req, res) => {
    try {
        const sql = "SELECT id, nombre_usuario, fecha, precio_total FROM ventas";

        const [rows] = await connection.query(sql);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron ventas"
            });
        }

        res.status(200).json({
            total: rows.length,
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo ventas: ", error.message);
        res.status(500).json({
            message: "Error interno al obtener ventas"
        });
    }
};


// GET sale by id
export const getSaleById = async (req, res) => {
    try {
        // El id ya fue validado y parseado por el middleware validateId, se accede desde req.id
        const sql = "SELECT id, nombre_usuario, fecha, precio_total FROM ventas WHERE ventas.id = ?";
        const [rows] = await connection.query(sql, [req.id]);

        if (rows.length === 0) {
            return res.status(404).json({
                error: `No se encontro venta con id ${req.id}`
            });
        }

        res.status(200).json({
            payload: rows[0]
        });

    } catch (error) {
        console.log("Error obteniendo venta con id: ", error.message);
        res.status(500).json({
            error: "Error interno al obtener una venta con id"
        });
    }
};


// POST sale
export const createSale = async (req, res) => {
    try {
        // Con destructuring, extraemos los datos enviados en el body de la peticion
        const { nombre_usuario, fecha, precio_total } = req.body;

        // El "?" es un placeholder que previene ataques de inyeccion SQL
        const sql = "INSERT INTO ventas (nombre_usuario, fecha, precio_total) VALUES (?, ?, ?)";
        await connection.query(sql, [nombre_usuario, fecha, precio_total]);

        res.status(201).json({
            message: "Venta creada con exito"
        });

    } catch (error) {
        console.log("Error creando venta: ", error.message);
        res.status(500).json({
            error: "Error interno al crear venta"
        });
    }
};


// PUT sale
export const updateSale = async (req, res) => {
    try {
        // Recibimos todos los campos de la venta a actualizar
        const { id, nombre_usuario, fecha, precio_total } = req.body;

        const sql = "UPDATE ventas SET nombre_usuario = ?, fecha = ?, precio_total = ? WHERE id = ?";
        await connection.query(sql, [nombre_usuario, fecha, precio_total, id]);

        res.status(200).json({
            message: "Venta actualizada correctamente"
        });

    } catch (error) {
        console.log("Error actualizando venta: ", error.message);
        res.status(500).json({
            error: "Error interno al actualizar venta"
        });
    }
};


// DELETE sale
export const deleteSale = async (req, res) => {
    try {
        await connection.query("DELETE FROM ventas WHERE id = ?", [req.id]);

        res.status(200).json({
            message: `Venta con id ${req.id} eliminada exitosamente`
        });

    } catch (error) {
        console.log("Error eliminando venta: ", error.message);
        res.status(500).json({
            error: "Error interno al eliminar venta"
        });
    }
};
