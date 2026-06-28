import express from "express";
import cors from "cors";
import serviceRouter from "./routes/serviceRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { authMiddleWare } from "./middleware/authMiddleWare.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://repair-mate-jsws.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", serviceRouter);
app.use("/auth", authRouter);
app.use("/api", authMiddleWare, bookingRouter);

export default app;
