import { Request, Response } from "express";
import Product from "../../models/product.model";
import Order from "../../models/order.model";
import Category from "../../models/category.model";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
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
          (file) => `http://${req.host}/uploads/${file.filename}`
        )
      : []; // path set by multer

    const product = new Product({
      name,
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

    await Category.updateOne({ name: category }, { $inc: { items: 1 } });

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

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error("Error getting product by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const {
      name,
      price,
      description,
      category,
      countInStock,
      color,
      size,
      tags,
    } = req.body;

    console.log(size, color);

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    const oldCategory = product.category;
    if (oldCategory !== category)
      await Category.updateOne({ name: oldCategory }, { $inc: { items: -1 } });

    // Handle new image uploads
    const newImagePaths = req.files
      ? (req.files as Express.Multer.File[]).map(
          (file) => `/uploads/${file.filename}`
        )
      : [];

    // Update fields only if provided
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    product.color = color;
    product.size = size;
    product.tags = tags;

    if (newImagePaths.length > 0) {
      product.images = newImagePaths; // Replace existing images
    }

    const updated = await product.save();

    if (oldCategory !== category)
      await Category.updateOne({ name: category }, { $inc: { items: 1 } });

    res.status(200).json({ success: true, product: updated });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Server error updating product" });
  }
};
