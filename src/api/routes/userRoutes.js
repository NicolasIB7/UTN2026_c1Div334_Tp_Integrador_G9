import { Router } from "express";
import validateId from "../middlewares/validateId.js";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

const router = Router();

// GET /api/users
router.get("/", getUsers);

// GET /api/users/:id
router.get("/:id", validateId, getUserById);

// POST /api/users
router.post("/", createUser);

// PUT /api/users
router.put("/", updateUser);

// DELETE /api/users/:id
router.delete("/:id", validateId, deleteUser);

export default router;
