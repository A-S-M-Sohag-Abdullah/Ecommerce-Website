import { Request, Response } from "express";
import Product from "../models/product.model";
import Order from "../models/order.model";
import mongoose from "mongoose";
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
  const products = await Product.find({ category: req.params.category }).sort({
    _id: -1,
  });
  if (products) {
    res.json(products);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const addProductReview = async (req: any, res: Response) => {
  const productId = req.params.id;
  const { rating, comment } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    console.log("product nai");
    res.status(404).json({ message: "Product not found" });
    return;
  }

  // ✅ Check if the product was purchased by the user
  const userOrders = await Order.find({
    user: req.user._id,
    orderItems: {
      $elemMatch: {
        product: new mongoose.Types.ObjectId(productId),
      },
    },
  });
  if (!userOrders || userOrders.length === 0) {
    console.log("order kore nai");
    res.status(403).json({
      message: "You can only review products you've purchased",
    });
    return;
  }

  product.reviews = product.reviews.filter(
    (rev: any) => rev.user.toString() !== req.user._id.toString()
  );

  // Add new review
  const newReview = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(newReview);

  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({ success: true, message: "Review added" });
};
