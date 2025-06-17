import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { use } from "passport";
import { ENV } from "../config/env";
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

export const updateProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user._id; // assuming you have auth middleware attaching `user`
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const {
      name,
      email,
      password,
      newPassword,
      phoneNumber,
      shippingAddress, // should be an object
    } = req.body;

    // Update basic fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    // Update image if file provided
    if (req.file) {
      let imagePath = `/uploads/${req.file.filename}`;
      if (ENV == "DEV") {
        imagePath = `http://${req.hostname}:5000/uploads/${req.file.filename}`;
      } else {
        imagePath = `https://${req.hostname}/uploads/${req.file.filename}`;
      }
      user.avatar = imagePath;
    }

    // Update address if provided
    if (shippingAddress) {
      user.shippingAddress = {
        ...user.shippingAddress,
        ...shippingAddress,
      };
    }

    // Password change logic
    if (password && newPassword) {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        res.status(400).json({ message: "Incorrect current password" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    const updated = await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updated._id,
        name: updated.name,
        email: updated.email,
        avatar: updated.avatar,
        phoneNumber: updated.phoneNumber,
        shippingAddress: updated.shippingAddress,
      },
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
