import { Request, Response } from "express";
import Product from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  console.log('hit')
  res.json(products);
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
