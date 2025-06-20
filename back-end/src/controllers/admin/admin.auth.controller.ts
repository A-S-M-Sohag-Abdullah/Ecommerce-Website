import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password, keepLoggedIn } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  // generate JWT for admin
  const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  const keepLoggedInDuration = keepLoggedIn
    ? 30 * 24 * 60 * 60 * 1000
    : 7 * 24 * 60 * 60 * 1000; // 30 days if keepLoggedIn, else 7 days

  res
    .cookie("admin_token", token, {
      httpOnly: true,
      secure: true, // use HTTPS in production
      sameSite: "none",
      maxAge: keepLoggedInDuration, // 1 week
    })
    .json({ success: true, message: "Admin login successful", token });
};
