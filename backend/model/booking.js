// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   status:{type:String,default:"booked"},
// deliveryBoyId:{ type: mongoose.Schema.Types.ObjectId, ref:'DeliveryBoy'},
//  address:{type:String},
//  otp: {
//   type: String,
//   default:null
// },
// deliveryConfirmed: {
//   type: Boolean,
//   default: false,
// },
// otpCode:{
//   type: String,
//   default:null
// },
//  phonenumber:{type:String}
// });

// // module.exports = mongoose.model("Booking", bookingSchema);
// const Booking= mongoose.model("Booking",bookingSchema);
// export default Booking;
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
      default: Date.now,
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
