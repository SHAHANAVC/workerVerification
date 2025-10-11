import express from "express";
import {
  registerPolice,
  getPolice,
  getPoliceById,
  updatePolice,
  deletePolice,
} from "../controllers/policeController.js";

const router = express.Router();

// Routes
router.post("/register", registerPolice);
router.get("/", getPolice);
router.get("/:id", getPoliceById);
router.put("/:id", updatePolice);
router.delete("/:id", deletePolice);

export default router;
