const fs = require('fs').promises;
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '../../data/products.json');

class ProductService {
  async getAllProducts() {
    try {
      const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading products file:', error);
      throw new Error('Could not fetch products');
    }
  }
}

module.exports = new ProductService();
