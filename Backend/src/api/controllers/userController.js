import { getAllUsers, getUserById as fetchUserById, insertUser, updateUserById, deleteUserById } from "../models/userModel.js";


export const getUsers = async (_req, res) => {
    try {
        const rows = await getAllUsers();

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
        const rows = await fetchUserById(req.id);

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

        await insertUser(nombreClean, emailClean, passwordClean, esAdmin);

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

        const result = await updateUserById(id, nombreClean, emailClean, passwordClean, esAdmin);

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
        const result = await deleteUserById(req.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: `No se encontro usuario con id ${req.id}` });
        }

        res.status(200).json({ error: false, message: `Usuario con id ${req.id} eliminado exitosamente` });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al eliminar usuario" });
    }
};
