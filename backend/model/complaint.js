import mongoose, { Schema } from 'mongoose';
const complaintSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Login',
    required: true
  },
  shopId: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  complaintText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reply: {
    text: { type: String, default: '' },  // Store the reply text
    dateReplied: { type: Date }           // Track reply date
  },
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
