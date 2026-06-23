import connection from "../database/db.js";


export const getUsers = async (_req, res) => {
    try {
        const [rows] = await connection.query("SELECT id, nombre, email, esAdmin FROM usuarios");

        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: "No se encontraron usuarios", data: [] });
        }

        res.status(200).json({ error: false, count: rows.length, data: rows });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al obtener usuarios" });
    }
};


export const getUserById = async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT id, nombre, email, esAdmin FROM usuarios WHERE id = ?", [req.id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: `No se encontro usuario con id ${req.id}` });
        }

        res.status(200).json({ error: false, data: rows[0] });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al obtener usuario" });
    }
};


export const createUser = async (req, res) => {
    try {
        const { nombre, email, password, esAdmin } = req.body;

        if (!nombre || !email || !password || esAdmin === undefined) {
            return res.status(400).json({ error: true, message: "Faltan campos requeridos: nombre, email, password, esAdmin" });
        }

        const nombreClean = nombre.trim();
        const emailClean = email.trim();
        const passwordClean = password.trim();

        if (!nombreClean || !emailClean || !passwordClean) {
            return res.status(400).json({ error: true, message: "Los campos no pueden estar vacios" });
        }

        await connection.query(
            "INSERT INTO usuarios (nombre, email, password, esAdmin) VALUES (?, ?, ?, ?)",
            [nombreClean, emailClean, passwordClean, esAdmin]
        );

        res.status(201).json({ error: false, message: "Usuario creado con exito" });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al crear usuario" });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id, nombre, email, password, esAdmin } = req.body;

        if (!id || !nombre || !email || !password || esAdmin === undefined) {
            return res.status(400).json({ error: true, message: "Faltan campos requeridos: id, nombre, email, password, esAdmin" });
        }

        const nombreClean = nombre.trim();
        const emailClean = email.trim();
        const passwordClean = password.trim();

        if (!nombreClean || !emailClean || !passwordClean) {
            return res.status(400).json({ error: true, message: "Los campos no pueden estar vacios" });
        }

        const [result] = await connection.query(
            "UPDATE usuarios SET nombre = ?, email = ?, password = ?, esAdmin = ? WHERE id = ?",
            [nombreClean, emailClean, passwordClean, esAdmin, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: `No se encontro usuario con id ${id}` });
        }

        res.status(200).json({ error: false, message: "Usuario actualizado correctamente" });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al actualizar usuario" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const [result] = await connection.query("DELETE FROM usuarios WHERE id = ?", [req.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: `No se encontro usuario con id ${req.id}` });
        }

        res.status(200).json({ error: false, message: `Usuario con id ${req.id} eliminado exitosamente` });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al eliminar usuario" });
    }
};
