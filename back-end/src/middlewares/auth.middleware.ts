import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { JWT_SECRET } from "../config/env";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token; // ⬅️ Token comes from HTTP-only cookie

    if (!token) {
      res.status(401).json({ message: "Not authorized, no token" });
      return;
    }

    const decoded: any = jwt.verify(token, JWT_SECRET as string);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    //console.log(token);
    next();
  } catch (error) {
    console.log(req.cookies);
    console.log("Auth errors:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
