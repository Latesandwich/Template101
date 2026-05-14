const productRepository = require('../repositories/productRepository');

class ProductService {
  async getAllProducts() {
    return productRepository.getAllProducts();
  }

  async getProductsByCategory(category) {
    const products = await this.getAllProducts();
    if (!category || category === 'All') {
      return products;
    }

    return products.filter(p =>
      (p.name && p.name.toLowerCase().includes(category.toLowerCase())) ||
      (p.category && p.category.toLowerCase() === category.toLowerCase())
    );
  }
}

module.exports = new ProductService();
