import bookingData from "../model/booking.js";

// ✅ User books a worker
export const createBooking = async (req, res) => {
  try {
    const { user, worker, workDescription, address } = req.body;

    const booking = await bookingData.create({
      user,
      worker,
      workDescription,
      address,
      status: "pending",
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Worker accepts booking
export const acceptBooking = async (req, res) => {
  try {
    const booking = await bookingData.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking accepted", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Worker rejects booking
export const rejectBooking = async (req, res) => {
  try {
    const booking = await bookingData.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking rejected", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ User marks booking as completed
export const completeBooking = async (req, res) => {
  try {
    const booking = await bookingData.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking marked as completed", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ User views their booking history
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingData
      .find({ user: req.params.userId })
      .populate("worker", "name jobTitle skill phone email");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Worker views their booking history
export const getWorkerBookings = async (req, res) => {
  try {
    const bookings = await bookingData
      .find({ worker: req.params.workerId })
      .populate("user", "name email phone");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
