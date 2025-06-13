// controllers/category.controller.ts
import { Request, Response } from "express";
import Category from "../../models/category.model";
import Product from "../../models/product.model";

// Add Category
export const addCategory = async (req: Request, res: Response) => {
  console.log("Adding category with body:", req.body);
  console.log("File received:", req.file);
  try {
    const { name, description } = req.body;
    const image = `/uploads/${req.file?.filename}`;

    const exists = await Category.findOne({ name });
    if (exists) {
      res.status(400).json({ message: "Category already exists" });
      return;
    }

    const category = new Category({ name, description, image });
    const savedCategory = await category.save();
    res.status(201).json({ success: true, category: savedCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get All Categories
export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get Single Category
export const getCategory = async (req: Request, res: Response) => {
  try {
    console.log("hit");
    const categoryName = req.params.name;
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Update Category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { oldName } = req.params;
    const { name, description } = req.body;
    const image = `/uploads/${req.file?.filename}`;

    const updates: any = { name, description };
    if (image) updates.image = image;

    const updated = await Category.findOneAndUpdate(
      { name: oldName },
      { $set: updates },
      { new: true }
    );
    if (updated) {
      await Product.updateMany(
        { category: oldName },
        { $set: { category: updates.name } }
      );
    }
    if (!updated) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json({ success: true, updated: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
