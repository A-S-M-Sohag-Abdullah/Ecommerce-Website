import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import User from "../models/user.model";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id as string),
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id as string),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
