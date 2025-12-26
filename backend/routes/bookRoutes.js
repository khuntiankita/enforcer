import express from "express";
import {
  createBookingRequest,
  outgoingBookings,
  incomingBookings,
  createWorkerRequest,
  outgoingWorkerRequests,
  incomingWorkerRequests,
  approveRequest,
} from "../controller/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book", protect, createBookingRequest);

router.get("/requested", protect, outgoingBookings);

router.get("/requests", protect, incomingBookings);

router.post("/requesttosupplier",protect,createWorkerRequest);
router.get("/requestedtosupplier", protect, outgoingWorkerRequests);

router.get("/requestsbyworker", protect, incomingWorkerRequests);

router.put("/:id/approve", protect, approveRequest);
export default router;
