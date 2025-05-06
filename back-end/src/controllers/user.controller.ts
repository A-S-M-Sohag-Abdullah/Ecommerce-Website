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

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const { name, avatar } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (name) user.name = name;
    /*     if (avatar) user.avatar = avatar; */

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        /* avatar: user.avatar, */
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err });
  }
};
