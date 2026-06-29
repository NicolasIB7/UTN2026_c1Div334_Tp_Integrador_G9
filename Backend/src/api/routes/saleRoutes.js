import { Router } from "express";
import validateId from "../middlewares/validateId.js";
import {
    getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
} from "../controllers/index.js";

const router = Router();

// GET /api/sales
router.get("/", getSales);

// GET /api/sales/:id
router.get("/:id", validateId, getSaleById);

// POST /api/sales
router.post("/", createSale);

// PUT /api/sales
router.put("/", updateSale);

// DELETE /api/sales/:id
router.delete("/:id", validateId, deleteSale);

export default router;
