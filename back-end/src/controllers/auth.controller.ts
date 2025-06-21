import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import User from "../models/user.model";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { GOOGLE_CLIENT_ID, JWT_SECRET } from "../config/env";
import nodemailer from "nodemailer";
import { generateResetToken } from "../utils/generateToken";
import passport from "passport";
import { IUser } from "../types/user";
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Handles callback from Google
export const googleCallback = [
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failure",
  }),
  (req: Request, res: Response) => {
    const user = req.user as IUser; // Make sure `req.user` is typed correctly
    const token = generateToken(user._id);

    // Option 1: Redirect with token in query param
    console.log(req.user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // use HTTPS in prod
      sameSite: "none", // helps prevent CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });
    res.redirect(
      `${process.env.FRONTEND_URL?.split(",")[0]}/authSuccess?token=${token}`
    );

    // Option 2: Or return JSON (if you’re hitting via fetch)
    //res.status(200).json({ token, user });
  },
];

// Auth failure route
export const googleFailure = (_req: Request, res: Response) => {
  res.status(401).send("Failed to authenticate with Google");
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // use true in production
    sameSite: "none", // or "none" for cross-site with secure: true
  });

  res.redirect(
    process.env.FRONTEND_URL?.split(",")[0] || "http://localhost:3000"
  );
};

// Logout route
export const logout = (req: Request, res: Response) => {
  req.logout(() => {
   res.redirect(
    process.env.FRONTEND_URL?.split(",")[0] || "http://localhost:3000"
  );
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  try {
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id as string);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // use HTTPS in prod
        sameSite: "none", // helps prevent CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      })
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password)) && !user?.isGoogle) {
    const token = generateToken(user._id as string);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // use HTTPS in prod
        sameSite: "none", // helps prevent CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      })
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// SEND RESET EMAIL
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "No user with this email" });
    return;
  }

  const { token, hashedToken } = generateResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes
  await user.save();

  const resetUrl = `http://localhost:3000/reset-password/${token}`;

  // send email (demo purpose only)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Reset your password",
    html: `<p>Click to reset: <a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  await transporter.sendMail(mailOptions);

  res.json({ message: "Password reset link sent to email" });
};

// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ message: "Password updated successfully" });
};

// GET Logged In USER PROFILE
export const getLoggedInUser = async (req: any, res: Response) => {
  //console.log("getLoggedInUser");
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  //console.log(user);
  res.json(user);
};
