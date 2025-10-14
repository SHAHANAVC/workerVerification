
import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    worker: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    date: {
      type: Date,
      // default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    workDescription: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const bookingData = mongoose.model("Booking", bookingSchema);
export default bookingData;
