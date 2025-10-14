import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    worker: { type: Schema.Types.ObjectId, ref: "Worker", required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    workDescription: { type: String, required: true },
    address: { type: String, required: true },
    duration: { type: Number, default: 1 },
    totalAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const bookingData = mongoose.model("Booking", bookingSchema);
export default bookingData;
