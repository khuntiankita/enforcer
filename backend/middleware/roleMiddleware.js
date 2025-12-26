import { userInfo } from "os";
import User from "../models/user.js";
export const requireRole = (roles) => {

    return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
  };
};
