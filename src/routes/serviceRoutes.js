import express from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "../controllers/serviceController.js";

const serviceRouter = express.Router();

serviceRouter.get("/services", getAllServices);
serviceRouter.post("/services", createService);
serviceRouter.get("/services/:id", getServiceById);
serviceRouter.patch("/services/:id", updateService);
serviceRouter.delete("/services/:id", deleteService);

export default serviceRouter;
