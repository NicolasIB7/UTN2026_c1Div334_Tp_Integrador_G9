import connection from "../database/db.js";


// GET all users
export const getUsers = async (req, res) => {
    try {
        // No seleccionamos password por seguridad
        const sql = "SELECT id, nombre, email, esAdmin FROM usuarios";

        const [rows] = await connection.query(sql);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron usuarios"
            });
        }

        res.status(200).json({
            total: rows.length,
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo usuarios: ", error.message);
        res.status(500).json({
            message: "Error interno al obtener usuarios"
        });
    }
};


// GET user by id
export const getUserById = async (req, res) => {
    try {
        // El id ya fue validado y parseado por el middleware validateId, se accede desde req.id
        const sql = "SELECT id, nombre, email, esAdmin FROM usuarios WHERE usuarios.id = ?";
        const [rows] = await connection.query(sql, [req.id]);

        if (rows.length === 0) {
            return res.status(404).json({
                error: `No se encontro usuario con id ${req.id}`
            });
        }

        res.status(200).json({
            payload: rows[0]
        });

    } catch (error) {
        console.log("Error obteniendo usuario con id: ", error.message);
        res.status(500).json({
            error: "Error interno al obtener un usuario con id"
        });
    }
};


// POST user
export const createUser = async (req, res) => {
    try {
        // Con destructuring, extraemos los datos enviados en el body de la peticion
        const { nombre, email, password, esAdmin } = req.body;

        // El "?" es un placeholder que previene ataques de inyeccion SQL
        const sql = "INSERT INTO usuarios (nombre, email, password, esAdmin) VALUES (?, ?, ?, ?)";
        await connection.query(sql, [nombre, email, password, esAdmin]);

        res.status(201).json({
            message: "Usuario creado con exito"
        });

    } catch (error) {
        console.log("Error creando usuario: ", error.message);
        res.status(500).json({
            error: "Error interno al crear usuario"
        });
    }
};


// PUT user
export const updateUser = async (req, res) => {
    try {
        // Recibimos todos los campos del usuario a actualizar
        const { id, nombre, email, password, esAdmin } = req.body;

        const sql = "UPDATE usuarios SET nombre = ?, email = ?, password = ?, esAdmin = ? WHERE id = ?";
        await connection.query(sql, [nombre, email, password, esAdmin, id]);

        res.status(200).json({
            message: "Usuario actualizado correctamente"
        });

    } catch (error) {
        console.log("Error actualizando usuario: ", error.message);
        res.status(500).json({
            error: "Error interno al actualizar usuario"
        });
    }
};


// DELETE user
export const deleteUser = async (req, res) => {
    try {
        await connection.query("DELETE FROM usuarios WHERE id = ?", [req.id]);

        res.status(200).json({
            message: `Usuario con id ${req.id} eliminado exitosamente`
        });

    } catch (error) {
        console.log("Error eliminando usuario: ", error.message);
        res.status(500).json({
            error: "Error interno al eliminar usuario"
        });
    }
};
