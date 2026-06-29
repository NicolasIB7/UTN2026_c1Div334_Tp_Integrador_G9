import { Router } from "express";
import validateId from "../middlewares/validateId.js";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = Router();

// GET /api/products
router.get("/", getProducts);

// GET /api/products/:id
router.get("/:id", validateId, getProductById);

// POST /api/products
router.post("/", createProduct);

// PUT /api/products
router.put("/", updateProduct);

// DELETE /api/products/:id
router.delete("/:id", validateId, deleteProduct);

export default router;