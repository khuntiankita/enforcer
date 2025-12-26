import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getWorkersBySupplier,
  getSuppliersForContractor,
  getSupplierInfo,
  logoutUser,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/suppliers", getSuppliersForContractor);
router.get("/worker", protect,getWorkersBySupplier);
router.get("/profile", protect,getUserProfile);
router.put("/profile", protect,updateUserProfile);
router.get("/profile/force", protect, getSupplierInfo);


export default router;
