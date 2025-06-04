import { Request, Response } from "express";
import Product from "../../models/product.model";
import Order from "../../models/order.model";

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
      color: color, // Convert comma-separated string to array
      size: size, // Convert comma-separated string to array
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

export const getTopProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const salesData = await Order.aggregate([
      { $unwind: "$orderItems" }, // assuming orders contain `items: [{ product, quantity }]`
      {
        $group: {
          _id: "$orderItems.product", // group by product ID
          totalSold: { $sum: "$orderItems.quantity" }, // sum quantities
        },
      },
      {
        $sort: { totalSold: -1 }, // sort in ascending order
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          name: "$productDetails.name",
          totalSold: 1,
          price: "$productDetails.price",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    const countResult = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.product",
        },
      },
      { $count: "totalProducts" },
    ]);
    console.error("Count result:", countResult);
    const totalProducts = countResult[0]?.totalProducts || 0;
    res.json({
      topProducts: salesData,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.error("Error getting products by sales:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
