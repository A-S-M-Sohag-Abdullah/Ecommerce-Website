import { Request, Response } from "express";
import User from "../models/user.model";

export const getProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("User not authenticated");
  }

  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
