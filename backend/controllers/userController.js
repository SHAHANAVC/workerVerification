import bcrypt from "bcryptjs";
import userData from "../model/userModel.js";
import loginData from "../model/login.js";

export const createUser = async (req, res) => {
  const { name, email, phone, password } = req.body; // include password

  try {
    // Check if user already exists in Login
    const existingLogin = await loginData.findOne({ username: email });
    if (existingLogin) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password and create login
    const hashedPassword = await bcrypt.hash(password, 10);
    const login = await loginData.create({
      username: email,
      password: hashedPassword,
      role: "user",
    });

    // Create user profile and link login
    const user = await userData.create({
      name,
      email,
      phone,
      commonKey: login._id,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await userData.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await userData.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update User
export const updateUser = async (req, res) => {
  try {
    const user = await userData.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await userData.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
