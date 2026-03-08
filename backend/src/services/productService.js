import { ProductRepository } from '../repositories/productRepository.js';

export class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async getProducts(filters) {
    const { data, total } = await this.repository.findAll(filters);
    return {
      data,
      pagination: {
        page: parseInt(filters.page) || 1,
        limit: parseInt(filters.limit) || 20,
        total,
        totalPages: Math.ceil(total / (parseInt(filters.limit) || 20))
      }
    };
  }

  async getProductById(id) {
    return await this.repository.findById(id);
  }
}
