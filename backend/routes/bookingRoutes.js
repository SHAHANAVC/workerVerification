import express from "express";
import {
  createBooking,
  acceptBooking,
  rejectBooking,
  completeBooking,
  getUserBookings,
  getWorkerBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// User creates booking
router.post("/", createBooking);

// Worker actions
router.put("/:id/accept", acceptBooking);
router.put("/:id/reject", rejectBooking);

// User marks booking as completed
router.put("/:id/complete", completeBooking);

// Booking history
router.get("/user/:userId", getUserBookings);
router.get("/worker/:workerId", getWorkerBookings);

export default router;
