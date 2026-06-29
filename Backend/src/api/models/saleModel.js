import connection from "../database/db.js";

export const getAllSales = async () => {
    const [rows] = await connection.query("SELECT id, nombre_usuario, fecha, precio_total FROM ventas");
    return rows;
};

export const getSaleById = async (id) => {
    const [rows] = await connection.query(
        "SELECT id, nombre_usuario, fecha, precio_total FROM ventas WHERE id = ?",
        [id]
    );
    return rows;
};

export const insertSale = async (nombre_usuario, fecha, precio_total) => {
    await connection.query(
        "INSERT INTO ventas (nombre_usuario, fecha, precio_total) VALUES (?, ?, ?)",
        [nombre_usuario, fecha, precio_total]
    );
};

export const updateSaleById = async (id, nombre_usuario, fecha, precio_total) => {
    const [result] = await connection.query(
        "UPDATE ventas SET nombre_usuario = ?, fecha = ?, precio_total = ? WHERE id = ?",
        [nombre_usuario, fecha, precio_total, id]
    );
    return result;
};

export const deleteSaleById = async (id) => {
    const [result] = await connection.query("DELETE FROM ventas WHERE id = ?", [id]);
    return result;
};
