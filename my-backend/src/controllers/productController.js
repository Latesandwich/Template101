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

  async filterProducts(req, res) {
    try {
      // 3. Processing: Server opens the envelope
      const { category } = req.body;

      // Gatekeeper Logic: Check if request is valid
      if (!category) {
        return res.status(400).json({
          status: 'fail',
          message: 'Category envelope is missing or invalid'
        });
      }

      const products = await productService.getProductsByCategory(category);

      // 4. Response: Server sends back a "Package" and a "Status"
      res.status(200).json({
        status: 'success',
        package: {
          products,
          count: products.length,
          appliedCategory: category
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
