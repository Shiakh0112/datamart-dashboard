import { ProductService } from '../services/productService.js';
import { formatResponse } from '../utils/responseFormatter.js';

const productService = new ProductService();

export const getProducts = async (req, res, next) => {
  try {
    const { page, limit, search, category } = req.query;
    const result = await productService.getProducts({ page, limit, search, category });
    res.json(formatResponse(result.data, result.pagination));
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.json(formatResponse(product));
  } catch (error) {
    next(error);
  }
};
