import { Request, Response } from 'express';
import Product from '../models/product.model';

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
