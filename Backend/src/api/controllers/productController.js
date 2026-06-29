import { getAllProducts, getProductById as fetchProductById, insertProduct, updateProductById, deleteProductById } from "../models/productModel.js";

export const getProducts = async (_req, res) => {
    try {
        const rows = await getAllProducts();

        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: "No se encontraron productos", data: [] });
        }

        res.status(200).json({ error: false, count: rows.length, data: rows });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al obtener productos" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const rows = await fetchProductById(req.id);

        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: `No se encontro producto con id ${req.id}` });
        }

        res.status(200).json({ error: false, data: rows[0] });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al obtener producto" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, imagen, categoria, activo } = req.body;

        if (!nombre || precio === undefined || !imagen || !categoria || activo === undefined) {
            return res.status(400).json({ error: true, message: "Faltan campos requeridos: nombre, precio, imagen, categoria, activo" });
        }

        const nombreClean = nombre.trim();
        const imagenClean = imagen.trim();
        const categoriaClean = categoria.trim();

        if (!nombreClean || !imagenClean || !categoriaClean) {
            return res.status(400).json({ error: true, message: "Los campos no pueden estar vacios" });
        }

        if (isNaN(precio) || Number(precio) < 0) {
            return res.status(400).json({ error: true, message: "precio debe ser un numero positivo" });
        }

        await insertProduct(nombreClean, Number(precio), imagenClean, categoriaClean, activo);

        res.status(201).json({ error: false, message: "Producto creado con exito" });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al crear producto" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id, nombre, precio, imagen, categoria, activo } = req.body;

        if (!id || !nombre || precio === undefined || !imagen || !categoria || activo === undefined) {
            return res.status(400).json({ error: true, message: "Faltan campos requeridos: id, nombre, precio, imagen, categoria, activo" });
        }

        const nombreClean = nombre.trim();
        const imagenClean = imagen.trim();
        const categoriaClean = categoria.trim();

        if (!nombreClean || !imagenClean || !categoriaClean) {
            return res.status(400).json({ error: true, message: "Los campos no pueden estar vacios" });
        }

        if (isNaN(precio) || Number(precio) < 0) {
            return res.status(400).json({ error: true, message: "precio debe ser un numero positivo" });
        }

        const result = await updateProductById(id, nombreClean, Number(precio), imagenClean, categoriaClean, activo);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: `No se encontro producto con id ${id}` });
        }

        res.status(200).json({ error: false, message: "Producto actualizado correctamente" });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al actualizar producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const result = await deleteProductById(req.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: `No se encontro producto con id ${req.id}` });
        }

        res.status(200).json({ error: false, message: `Producto con id ${req.id} eliminado exitosamente` });

    } catch (error) {
        res.status(500).json({ error: true, message: "Error interno al eliminar producto" });
    }
};
