import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Book from '../models/book.js';
import generateToken from '../utils/token.js';
import asyncHandler from 'express-async-handler';

const allowedRoles = ['User', 'Contractor', 'Worker', 'Supplier'];

// =======================
// Register User
// =======================
export const registerUser = async (req, res) => {
  const { email, name, license, password, role, age, work, force, number } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const finalRole = allowedRoles.includes(role) ? role : 'User';

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      role: finalRole,
      license: license || '',
      number,
      age,
      work,
      force,
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// =======================
// Login User
// =======================
export const loginUser = asyncHandler(async (req, res) => {
  const { name, password, role } = req.body;

  try {
    const user = await User.findOne({ name, role });

    if (user && (await bcrypt.compare(password, user.password))) {
      generateToken(res, user._id, user.role);

      res.status(200).json({
        success: true,
        _id: user._id,
        name: user.name,
        role: user.role,
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// =======================
// Get User Profile
// =======================
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);

  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error('Fetching users error:', err);
    res.status(500).json({ message: err.message });
  }
};

// =======================
// Get Workers of Supplier
// =======================
export const getWorkersBySupplier = async (req, res) => {
  try {
    const supplierId = req.user.id;
    const approvedWorkers = await User.find({
      role: 'Worker',
      supplier: supplierId,
      status: 'Approved',
    }).select('-password');
    res.status(200).json(approvedWorkers);
  } catch (err) {
    console.error('Error fetching approved workers for supplier:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getSuppliersForContractor = async (req, res) => {
  try {
    const suppliers = await User.find({ role: 'Supplier' }).select('name work force');
    res.status(200).json(suppliers);
  } catch (err) {
    console.error("Error fetching suppliers:", err);
    res.status(500).json({ message: "Server error while fetching suppliers" });
  }
};

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.number = req.body.number || user.number;
    user.age = req.body.age || user.age;
    user.work = req.body.work || user.work;
    user.force = req.body.force || user.force;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      number: updatedUser.number,
      age: updatedUser.age,
      work: updatedUser.work,
      force: updatedUser.force,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};


export const getSupplierInfo = async (req, res) => {
  try {
    const supplier = await User.findById(req.user.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });

    // Ensure force is a number
    const totalForce = Number(supplier.force) || 0;

    // Get all approved bookings of this supplier that are ongoing or in future
    const now = new Date();
    const approvedBookings = await Book.find({
      supplierId: req.user.id,
      status: "Approved",
      type: "Booking",
      toDate: { $gte: now },
    });

    // Sum the 'force' field of each booking
    const bookedWorkers = approvedBookings.reduce((sum, b) => sum + (Number(b.force) || 0), 0);

    const availableForce = totalForce - bookedWorkers;

    res.status(200).json({
      name: supplier.name,
      totalForce,
      availableForce: availableForce >= 0 ? availableForce : 0,
    });
  } catch (err) {
    console.error("Error fetching supplier info:", err);
    res.status(500).json({ message: "Failed to fetch supplier info" });
  }
};