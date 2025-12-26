import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js"; // ✅ This line must be correct!

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt; // ✅ Read from cookies

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // ✅ req.user, not user
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Forbidden: Access denied");
    }
    next();
  };
};

export { protect, authorizeRoles };
