import bcrypt from "bcryptjs";
import policeData from "../model/policeModel.js";
import loginData from "../model/login.js";

// ✅ Register Police
export const registerPolice = async (req, res) => {
  const { name, email, phone, password, station, rank } = req.body;

  try {
    // Check if police already exists
    const existingLogin = await loginData.findOne({ username: email });
    if (existingLogin) {
      return res.status(400).json({ message: "Police already exists" });
    }

    // Hash password and create login
    const hashedPassword = await bcrypt.hash(password, 10);
    const login = await loginData.create({
      username: email,
      password: hashedPassword,
      role: "police",
    });

    // Create police profile
    const police = await policeData.create({
      commonKey: login._id,
      name,
      email,
      phone,
      station,
      rank,
    });

    res.status(201).json({ message: "Police registered successfully", police });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Police
export const getPolice = async (req, res) => {
  try {
    const policeList = await policeData.find().populate("commonKey");
    res.status(200).json(policeList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Police by ID
export const getPoliceById = async (req, res) => {
  try {
    const police = await policeData.findById(req.params.id).populate("commonKey");
    if (!police) return res.status(404).json({ message: "Police not found" });
    res.status(200).json(police);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Police
export const updatePolice = async (req, res) => {
  try {
    const police = await policeData.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!police) return res.status(404).json({ message: "Police not found" });
    res.status(200).json(police);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete Police (also remove login)
export const deletePolice = async (req, res) => {
  try {
    const police = await policeData.findById(req.params.id);
    if (!police) return res.status(404).json({ message: "Police not found" });

    await policeData.findByIdAndDelete(req.params.id);
    if (police.commonKey) {
      await loginData.findByIdAndDelete(police.commonKey);
    }

    res.status(200).json({ message: "Police and login deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
