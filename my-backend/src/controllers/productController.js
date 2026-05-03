const productService = require('../services/productService');

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
          products
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = new ProductController();
