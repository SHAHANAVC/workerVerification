import express from "express";
import {
//   createWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
  getWorkerByLoginId,
} from "../controllers/workerController.js";
import { registerWorker } from "../controllers/workerController.js";
import upload from "../middleware/upload.js";

const router = express.Router();
 
// Routes
router.post("/",upload.single("image"), registerWorker);         // Create new worker
router.get("/", getWorkers);            // Get all workers
router.get("/:id", getWorkerById);      // Get single worker by ID
router.put("/:id", updateWorker);       // Update worker by ID
router.delete("/:id", deleteWorker);    // Delete worker by ID
router.get('/home/:id',getWorkerByLoginId)
export default router;
