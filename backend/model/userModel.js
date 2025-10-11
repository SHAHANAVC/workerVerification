import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  commonKey: {
    type: Schema.Types.ObjectId,
    ref: "Login", // linked to login
  },
});

const userData = mongoose.model("User", userSchema);

export default userData;
