import { Request, Response, NextFunction } from "express";
import User from "../models/user.model"; // adjust path as needed

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    // Optionally fetch fresh user from DB if needed
    const dbUser = await User.findById(user._id);
    if (!dbUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!dbUser.isAdmin) {
      res.status(403).json({ message: "Access denied: Admins only" });
      return;
    }

    next(); // user is admin
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
