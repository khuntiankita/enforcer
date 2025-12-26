import Book from '../models/book.js';
import User from '../models/user.js';
import cron from 'node-cron';

cron.schedule('0 * * * *', async () => {
  const now = new Date();
  try {
    const result = await Book.deleteMany({ toDate: { $lt: now } });
    console.log(`[Cron Job] Expired requests deleted: ${result.deletedCount}`);
  } catch (err) {
    console.error('[Cron Job] Error deleting expired requests:', err);
  }
});

export const createBookingRequest = async (req, res) => {
  try {
    const { supplierId, name, description, force, work, duration, city, fromDate, toDate, number } = req.body;

    if (!supplierId || !name || !description || !work) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const booking = new Book({
      userId: req.user.id,   
      supplierId,
      name,
      description,
      work,
      force,
      duration,
      city,
      fromDate: fromDate || null,
      toDate: toDate || null,
      number,
      status: "Pending",
      type: "Booking",
    });

    await booking.save();
    res.status(201).json({ message: "Booking request created", booking });

  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};

export const createWorkerRequest = async (req, res) => {
  try {
    const { supplierId, name, description, work, city, number } = req.body;

    if (!supplierId || !name || !description || !work) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const workerRequest = new Book({
      userId: req.user.id,
      supplierId,
      name,
      description,
      work,
      city,
      number,
      status: "Pending",
      type: "WorkerRequest",
    });

    await workerRequest.save();
    res.status(201).json({ message: "Worker request created", booking: workerRequest });

  } catch (err) {
    console.error("Worker request creation error:", err);
    res.status(500).json({ message: "Worker request failed" });
  }
};

export const outgoingBookings = async (req, res) => {
  try {
    const bookings = await Book.find({ userId: req.user.id, type: "Booking" })
      .populate("supplierId", "name work force")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Outgoing bookings fetch error:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

export const incomingBookings = async (req, res) => {
  try {
    const bookings = await Book.find({ supplierId: req.user.id, type: "Booking" })
      .populate("userId", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Incoming bookings fetch error:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

export const outgoingWorkerRequests = async (req, res) => {
  try {
    const requests = await Book.find({ userId: req.user.id, type: "WorkerRequest" })
      .populate("supplierId", "name work force")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    console.error("Outgoing worker requests fetch error:", err);
    res.status(500).json({ message: "Error fetching worker requests" });
  }
};

export const incomingWorkerRequests = async (req, res) => {
  try {
    const requests = await Book.find({ supplierId: req.user.id, type: "WorkerRequest" })
      .populate("userId", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    console.error("Incoming worker requests fetch error:", err);
    res.status(500).json({ message: "Error fetching worker requests" });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const booking = await Book.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.supplierId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    booking.status = "Approved";
    await booking.save();

    return res.status(200).json({
      message: "Booking approved successfully",
      booking,
    });
  } catch (err) {
    console.error("Approve request error:", err);
    res.status(500).json({ message: "Failed to approve request" });
  }
};


