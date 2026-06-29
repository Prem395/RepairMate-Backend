import bookingModel from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
  try {
    const {
      fullName,
      service,
      deviceType,
      phoneNumber,
      issueDescription,
      imageUrl,
    } = req.body;

    if (
      !fullName ||
      !service ||
      !deviceType ||
      !phoneNumber ||
      !issueDescription
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const booking = await bookingModel.create({
      user: req.user._id,
      fullName,
      service,
      deviceType,
      phoneNumber,
      issueDescription,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Service booked successfully",
      booking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const booking = await bookingModel.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find()
      .populate("user", "firstName lastName email");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Booking ID",
      });
    }

    const validStatuses = ["Pending", "Confirmed", "In Progress", "Completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const booking = await bookingModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
