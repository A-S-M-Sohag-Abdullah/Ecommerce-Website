import { Request, Response } from "express";
import Category from "../models/category.model";

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
