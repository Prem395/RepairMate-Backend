import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    deviceType: {
      type: String,
      required: true,
    },

    issueDescription: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
