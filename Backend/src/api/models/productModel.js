import connection from "../database/db.js";

export const getAllProducts = async () => {
    const [rows] = await connection.query("SELECT id, nombre, precio, imagen, categoria, activo FROM productos");
    return rows;
};

export const getProductById = async (id) => {
    const [rows] = await connection.query(
        "SELECT id, nombre, precio, imagen, categoria, activo FROM productos WHERE id = ?",
        [id]
    );
    return rows;
};

export const insertProduct = async (nombre, precio, imagen, categoria, activo) => {
    await connection.query(
        "INSERT INTO productos (nombre, precio, imagen, categoria, activo) VALUES (?, ?, ?, ?, ?)",
        [nombre, precio, imagen, categoria, activo]
    );
};

export const updateProductById = async (id, nombre, precio, imagen, categoria, activo) => {
    const [result] = await connection.query(
        "UPDATE productos SET nombre = ?, precio = ?, imagen = ?, categoria = ?, activo = ? WHERE id = ?",
        [nombre, precio, imagen, categoria, activo, id]
    );
    return result;
};

export const deleteProductById = async (id) => {
    const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id]);
    return result;
};
