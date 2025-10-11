// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import multer from 'multer';
// const server = express();

// // Enable CORS for React frontend
// server.use(cors({
//   origin: 'http://localhost:5173',  // React frontend URL
// }));

// // Middleware to parse JSON and form data
// server.use(express.json());
// server.listen(8000, () => {
//     console.log('Server is running on port 8000');
//   })

//   mongoose.connect('mongodb://localhost:27017/NewWorkerRentalApp')
//   .then(() => {
//     console.log('Connected to MongoDB successfully');
//   })
//   .catch((error) => {
//     console.error('Error while connecting to DB:', error);
//   });

// // Register Shop and Login API
// server.post('/shopregister', upload.single('shopImage'), async (req, res) => {
//   try {
//     console.log(req.body);
    
//     const { shopName, shopEmail, shopAddress, password ,  latitude, longitude}  = req.body
//     const hashedPassword = await bcrypt.hash(password, 10);
//     // Create a new Login document for the user
//     const login = new loginData({
//       username: shopEmail,
//       password:hashedPassword,
//       role:"shop"
//     });
//     await login.save();  // Save login credentials

//     // Create a new Shop document for the shop details
//     const shopImage = req.file;  // Get the uploaded shop image
//     if (!shopImage) {
//       return res.status(400).send('Shop image is required');
//     }

//     const newShop = new shopData({
//       commonKey: login._id,  // Associate with the Login document using commonKey
//       shopName,
//       shopEmail,
//       shopAddress,
//       location: { lat: latitude, lng: longitude }, 
//       shopImage: `/uploads/${shopImage.filename}`,  // Store the image URL
//     });

//     await newShop.save();  // Save shop details

//     res.status(201).send({
//       message: 'Shop registered successfully',
//       shop: newShop,
//     });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).send('Server error');
//   }
// });
import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";

import { uploadDir } from "./middleware/upload.js";
import authRoutes from "./routes/authRoutes.js";
import workerRoutes from "./routes/workerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import policeRoutes from "./routes/policeRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js"
const app = express();

// Required to replace __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(uploadDir));

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/user",userRoutes)
app.use('/api/police',policeRoutes)
app.use('/api/booking',bookingRoutes)
// DB connection
mongoose
  .connect("mongodb://localhost:27017/NewWorkerRentalApp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
