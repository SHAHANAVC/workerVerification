// import mongoose, { Schema } from 'mongoose';

// // Worker schema
// const workerSchema = new Schema({
//   commonKey: {
//     type: Schema.Types.ObjectId,
//     ref: "Login", // Assuming a 'Login' model for authentication and relationships
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   jobTitle: {
//     type: String,
//     required: true,
//   },
//   skill: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
  
//   },
//   phone: {
//     type: String,
//     required: true,
//   },

//   image: {
//     type: String,
//     required: true, // Path to the image file (stored as a string)
//   },

// });

// // Create the Worker model
// const workerData = mongoose.model('Worker', workerSchema);

// export default workerData;
import mongoose, { Schema } from 'mongoose';

// Worker schema
const workerSchema = new Schema({
  commonKey: {
    type: Schema.Types.ObjectId,
    ref: "Login", // Assuming a 'Login' model for authentication and relationships
  },
  name: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true, // Path to the image file (stored as a string)
  },

  // New fields
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // restrict values to specific options
    required: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true, // Aadhaar should be unique
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  temporaryAddress: {
    type: String,
  },
 
});

// Create the Worker model
const workerData = mongoose.model('Worker', workerSchema);

export default workerData;
