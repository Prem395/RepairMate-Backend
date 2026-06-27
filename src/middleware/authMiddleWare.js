import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "invalid credential",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded.id);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid credential",
    });
  }
};
