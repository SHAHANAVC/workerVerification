import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByLoginId,
} from "../controllers/userController.js";

const router = express.Router();

// Routes
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get('/bylogiId/:id',getUserByLoginId)

export default router;
