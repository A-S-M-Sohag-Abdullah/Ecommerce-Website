import { Request, Response } from "express";
import Product from "../../models/product.model";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      brand,
      price,
      description,
      category,
      countInStock,
      color,
      size,
    } = req.body;

    const imagePaths = req.files
      ? (req.files as Express.Multer.File[]).map(
          (file) => `/uploads/${file.filename}`
        )
      : []; // path set by multer

    const product = new Product({
      name,
      brand,
      price,
      description,
      category,
      countInStock,
      images: imagePaths,
      color: color ? color.split(",") : [], // Convert comma-separated string to array
      size: size ? size.split(",") : [], // Convert comma-separated string to array
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: "Server error adding product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
