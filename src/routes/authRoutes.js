import express from "express";
import { getMe, login, logout, signUp } from "../controllers/authController.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", authMiddleWare, getMe);

export default authRouter;
