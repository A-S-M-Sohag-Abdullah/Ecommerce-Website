import { Request, Response } from "express";
import Product from "../../models/product.model";

export const addProduct = async (req: Request, res: Response) => {
  console.log("Adding product with body:", req.body);
  console.log("Files received:", req.files);
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
      tags,
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
      color: color , // Convert comma-separated string to array
      size: size , // Convert comma-separated string to array
      tags: tags, // Convert comma-separated string to array
    });

    const savedProduct = await product.save();
    res.status(201).json({ success: true, product: savedProduct });
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
