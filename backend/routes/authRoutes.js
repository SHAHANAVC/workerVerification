import express from "express";
import { loginUser, updateWorkerVerification } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
// router.patch("/:id/approve", verifyWorker);
// router.post("/block/:id", blockShop);
router.patch("/:id/verify",updateWorkerVerification ); // Approve
// router.patch("/:id/reject", rejectWorker); // Reject
export default router;
