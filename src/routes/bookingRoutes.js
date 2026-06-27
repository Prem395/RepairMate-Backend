import express from "express";
import {
  createBooking,
  getAllBooking,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";
import { adminMiddleWare } from "../middleware/adminMiddleWare.js";

const bookingRouter = express.Router();

bookingRouter.post("/bookings", authMiddleWare, createBooking);
bookingRouter.get("/bookings/my", authMiddleWare, getMyBookings);

bookingRouter.get("/bookings", authMiddleWare, adminMiddleWare, getAllBooking);
bookingRouter.patch("/bookings/:id", authMiddleWare, adminMiddleWare, updateBookingStatus);

export default bookingRouter;
