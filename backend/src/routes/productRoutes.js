import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';
import { validateQuery } from '../middleware/validateQuery.js';

const router = express.Router();

router.get('/', validateQuery, getProducts);
router.get('/:id', getProductById);

export default router;
