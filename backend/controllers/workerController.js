import workerData from "../model/worker.js";

// ✅ Create Worker
import bcrypt from "bcryptjs";
import loginData from "../model/login.js";   // Login model
// import workerData from "../models/workerModel.js"; // Worker model

export const registerWorker = async (req, res) => {
  console.log(req.body);
  
  const {
    name,
    jobTitle,
    skill,
    email,
    password, // Worker password for login
    phone,
    gender,
    aadhaarNumber,
    permanentAddress,
    temporaryAddress,
  } = req.body;

  const image = req.file ? req.file.filename : null; // Save worker image filename
console.log(req.body);

  try {
    // 🔎 Check if worker email already exists in login collection
    const existingWorker = await loginData.findOne({ username: email });
    console.log(existingWorker,'eeeeeeeeeeeee');
    
    if (existingWorker) {
      return res.json({ message: "Worker already exists" });
    }

    // 🔑 Hash password and create login entry
    const hashedPassword = await bcrypt.hash(password, 10);
    const login = await loginData.create({
      username: email,
      password: hashedPassword,
      role: "worker",
    });
    console.log(login);
    

    // 📝 Create worker data entry
    await workerData.create({
      commonKey: login._id,
      name,
      jobTitle,
      skill,
      email,
      phone,
      image,
      gender,
      aadhaarNumber,
      permanentAddress,
      temporaryAddress,
    });

    return res.status(200).json({ message: "Worker registered successfully" });
  } catch (error) {
    console.error("Error registering worker:", error);
    return res.status(400).json({ message: "Failed to register worker" });
  }
};


// ✅ Get All Workers
export const getWorkers = async (req, res) => {
  try {
    const workers = await workerData.find().populate("commonKey"); // populate Login details if needed
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Worker by ID
export const getWorkerById = async (req, res) => {
  try {
    const worker = await workerData.findById(req.params.id).populate("commonKey");
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Worker
export const updateWorker = async (req, res) => {
  try {
    const worker = await workerData.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete Worker
// export const deleteWorker = async (req, res) => {
//   try {
//     const worker = await workerData.findByIdAndDelete(req.params.id);
//     if (!worker) {
//       return res.status(404).json({ message: "Worker not found" });
//     }
//     res.status(200).json({ message: "Worker deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


export const deleteWorker = async (req, res) => {
  try {
    // Find the worker first
    const worker = await workerData.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    // Delete the worker document
    await workerData.findByIdAndDelete(req.params.id);

    // Delete the associated login document
    if (worker.commonKey) {
      await loginData.findByIdAndDelete(worker.commonKey);
    }

    res.status(200).json({ message: "Worker and login deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getWorkerByLoginId = async (req, res) => {
  console.log(req.params.id);
  
  try {
    const worker = await workerData.findOne({ commonKey: req.params.id }).populate("commonKey");
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json(worker);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: error.message });
  }
};



export const getVerifiedWorkers = async (req, res) => {
  console.log('vvvvvvvvvvvvvvv');
  
  try {
    const workers = await workerData
      .find()
      .populate({
        path: "commonKey",
        match: { verify: true },
      
      });
console.log(workers);

    // Filter out workers where populate returned null
    // const verifiedWorkers = workers.filter(w => w.commonKey !== null);

    res.status(200).json(workers);
  } catch (error) {
    console.error("Error fetching verified workers:", error);
    res.status(500).json({ message: error.message });
  }
};

// routes/workerRoutes.js
router.put("/:id/approve", async (req, res) => {
  try {
    const updated = await Worker.findByIdAndUpdate(
      req.params.id,
      { clearanceStatus: "Completed" },
      { new: true }
    );
    res.json({ message: "Worker clearance marked as completed", worker: updated });
  } catch (error) {
    res.status(500).json({ message: "Error approving worker", error });
  }
});

// ✅ Upload Police Clearance Certificate
export const uploadPCC = async (req, res) => {
  try {
    const workerId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const updatedWorker = await workerData.findByIdAndUpdate(
      workerId,
      {
        clearanceCertificate: req.file.filename,
        clearanceStatus: "Completed",
      },
      { new: true }
    );

    res.status(200).json({
      message: "PCC uploaded successfully",
      worker: updatedWorker,
    });
  } catch (error) {
    console.error("Error uploading PCC:", error);
    res.status(500).json({ message: "Error uploading PCC", error });
  }
};