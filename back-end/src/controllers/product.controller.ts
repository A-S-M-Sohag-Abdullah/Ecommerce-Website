import { Request, Response } from "express";
import Product from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);
  const total = await Product.countDocuments();

  res.json({
    products,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    total: total,
  });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      res.status(400).json({ message: "Please provide a search term." });
      return;
    }

    const regex = new RegExp(name, "i"); // case-insensitive
    const products = await Product.find({ name: regex });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  console.log("getProductsByCategory");
  const products = await Product.find({ category: req.params.category }).sort({
    _id: -1,
  });
  console.log(products);
  if (products) {
    res.json(products);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
