// import bcrypt from "bcryptjs";
// import loginData from "../model/login.js";
// // import loginData from "../models/loginModel.js";

// export const loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   try {

//     const user = await loginData.findOne({ username });

//     if (!user) return res.status(400).json({ message: "Invalid username or password" });

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

//     res.status(200).json({ message: "Login successful", user });

//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const verifyShop = async (req, res) => {
//   try {
//     await loginData.findByIdAndUpdate(req.params.id, { verify: true });
//     res.status(200).json({ message: "Shop verified successfully!" });
//   } catch {
//     res.status(500).json({ error: "Failed to verify shop." });
//   }
// };

// export const blockShop = async (req, res) => {
//   try {
//     await loginData.findByIdAndUpdate(req.params.id, { verify: false });
//     res.status(200).json({ message: "Shop blocked successfully!" });
//   } catch {
//     res.status(500).json({ error: "Failed to block shop." });
//   }
// };
import bcrypt from "bcryptjs";
import loginData from "../model/login.js";
import workerData from "../model/worker.js";
// import workerData from "../model/worker.js";
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
console.log(req.body);

  try {
    // Find login entry
    const login = await loginData.findOne({ username });
    console.log(login);
    
    if (!login) return res.status(400).json({ message: "Invalid username" });

    // Compare password
    const isMatch = await bcrypt.compare(password, login.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

    // Check verification if worker
    if (login.role === "worker" && !login.verify) {
      return res.status(400).json({ message: "Worker not verified yet" });
    }

    // Optionally, fetch worker profile
    // let profile = null;
    // if (login.role === "worker") {
    //   profile = await workerData.findOne({ commonKey: login._id });
    // }



    res.status(200).json({
      message: "Login successful",
      // login: {
      //   id: login._id,
      //   username: login.username,
      //   role: login.role,
      //   verify: login.verify,
      // },
      // profile,
      login
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateWorkerVerification = async (req, res) => {
  console.log('yessssss');
  
  try {
    const worker = await workerData.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    if (!worker.commonKey) {
      return res.status(400).json({ message: "Worker has no linked login" });
    }

    const { verify } = req.body; // true = approve, false = reject

    const updatedLogin = await loginData.findByIdAndUpdate(
      worker.commonKey,
      { verify },
      { new: true }
    );

    res.status(200).json({
      message: verify ? "Worker approved successfully" : "Worker rejected successfully",
      updatedLogin,
    });
  } catch (error) {
    console.error("Update worker verification error:", error);
    res.status(500).json({ message: "Failed to update worker verification" });
  }
};
