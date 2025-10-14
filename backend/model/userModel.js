
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    
    email: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String },
    district: { type: String },
    commonKey: {
      type: Schema.Types.ObjectId,
      ref: "Login", // linked to login model
    },
  },
  { timestamps: true }
);

const userData = mongoose.model("User", userSchema);
export default userData;
