import Service from "../models/serviceModel.js";
import mongoose from "mongoose";

export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      message: "Services Create Sucessfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      message: "services loaded sucessfully",
      services,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({
        message: "Invalid Service ID",
      });
    }
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        message: "services not found",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({
        message: "Invalid Service ID",
      });
    }
    const service = await Service.findByIdAndUpdate(serviceId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({
        message: "service not found for update",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({
        message: "Invalid Service ID",
      });
    }
    const service = await Service.findByIdAndDelete(serviceId);
    if (!service) {
      return res.status(404).json({
        message: "service not found for deleting",
      });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
