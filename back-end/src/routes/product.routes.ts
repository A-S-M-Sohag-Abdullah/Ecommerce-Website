import express from 'express';
import { getProducts, getProductById, searchProducts } from '../controllers/product.controller';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get("/search", searchProducts); // ?name=searchQuery

export default router;
