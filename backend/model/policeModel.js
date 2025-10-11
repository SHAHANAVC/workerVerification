import mongoose, { Schema } from "mongoose";

const policeSchema = new Schema({
  commonKey: {
    type: Schema.Types.ObjectId,
    ref: "Login", // linked to login
  },
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
  station: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
});

const policeData = mongoose.model("Police", policeSchema);

export default policeData;
