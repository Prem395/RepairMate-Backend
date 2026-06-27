import bookingModel from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
  try {
    const { service, deviceType, phoneNumber, issueDescription, imageUrl } =
      req.body;

    if (!deviceType || !phoneNumber || !issueDescription) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const booking = await bookingModel.create({
      user: req.user._id,
      service,
      deviceType,
      phoneNumber,
      issueDescription,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "service booked successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const booking = await bookingModel
      .find({ user: req.user._id })
      .populate("service");

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
      .populate("user", "firstName lastName email")
      .populate("service", "title");

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

    const validStatuses = ["pending", "in-progress", "completed", "cancelled"];
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
