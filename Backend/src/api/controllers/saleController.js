import connection from "../database/db.js";


export const getSales = async (_req, res) => {
    try {
        const [rows] = await connection.query("SELECT id, nombre_usuario, fecha, precio_total FROM ventas");

        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: "No se encontraron ventas", data: [] });
        }

        res.status(200).json({ error: false, count: rows.length, data: rows });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al obtener ventas" });
    }
};


export const getSaleById = async (req, res) => {
    try {
        const [rows] = await connection.query(
            "SELECT id, nombre_usuario, fecha, precio_total FROM ventas WHERE id = ?",
            [req.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: `No se encontro venta con id ${req.id}` });
        }

        res.status(200).json({ error: false, data: rows[0] });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al obtener venta" });
    }
};


export const createSale = async (req, res) => {
    try {
        const { nombre_usuario, fecha, precio_total } = req.body;

        if (!nombre_usuario || !fecha || precio_total === undefined) {
            return res.status(400).json({ error: true, message: "Faltan campos requeridos: nombre_usuario, fecha, precio_total" });
        }

        const nombreClean = nombre_usuario.trim();
        const fechaClean = fecha.trim();

        if (!nombreClean || !fechaClean) {
            return res.status(400).json({ error: true, message: "Los campos no pueden estar vacios" });
        }

        if (isNaN(precio_total) || Number(precio_total) < 0) {
            return res.status(400).json({ error: true, message: "precio_total debe ser un numero positivo" });
        }

        await connection.query(
            "INSERT INTO ventas (nombre_usuario, fecha, precio_total) VALUES (?, ?, ?)",
            [nombreClean, fechaClean, Number(precio_total)]
        );

        res.status(201).json({ error: false, message: "Venta creada con exito" });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al crear venta" });
    }
};


export const updateSale = async (req, res) => {
    try {
        const { id, nombre_usuario, fecha, precio_total } = req.body;

        if (!id || !nombre_usuario || !fecha || precio_total === undefined) {
            return res.status(400).json({ error: true, message: "Faltan campos requeridos: id, nombre_usuario, fecha, precio_total" });
        }

        const nombreClean = nombre_usuario.trim();
        const fechaClean = fecha.trim();

        if (!nombreClean || !fechaClean) {
            return res.status(400).json({ error: true, message: "Los campos no pueden estar vacios" });
        }

        if (isNaN(precio_total) || Number(precio_total) < 0) {
            return res.status(400).json({ error: true, message: "precio_total debe ser un numero positivo" });
        }

        const [result] = await connection.query(
            "UPDATE ventas SET nombre_usuario = ?, fecha = ?, precio_total = ? WHERE id = ?",
            [nombreClean, fechaClean, Number(precio_total), id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: `No se encontro venta con id ${id}` });
        }

        res.status(200).json({ error: false, message: "Venta actualizada correctamente" });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al actualizar venta" });
    }
};


export const deleteSale = async (req, res) => {
    try {
        const [result] = await connection.query("DELETE FROM ventas WHERE id = ?", [req.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: `No se encontro venta con id ${req.id}` });
        }

        res.status(200).json({ error: false, message: `Venta con id ${req.id} eliminada exitosamente` });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al eliminar venta" });
    }
};
