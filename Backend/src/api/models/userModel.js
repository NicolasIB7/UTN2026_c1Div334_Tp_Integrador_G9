import connection from "../database/db.js";

export const getAllUsers = async () => {
    const [rows] = await connection.query("SELECT id, nombre, email, esAdmin FROM usuarios");
    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await connection.query(
        "SELECT id, nombre, email, esAdmin FROM usuarios WHERE id = ?",
        [id]
    );
    return rows;
};

export const insertUser = async (nombre, email, password, esAdmin) => {
    await connection.query(
        "INSERT INTO usuarios (nombre, email, password, esAdmin) VALUES (?, ?, ?, ?)",
        [nombre, email, password, esAdmin]
    );
};

export const updateUserById = async (id, nombre, email, password, esAdmin) => {
    const [result] = await connection.query(
        "UPDATE usuarios SET nombre = ?, email = ?, password = ?, esAdmin = ? WHERE id = ?",
        [nombre, email, password, esAdmin, id]
    );
    return result;
};

export const deleteUserById = async (id) => {
    const [result] = await connection.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return result;
};
