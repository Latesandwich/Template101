const fs = require('fs').promises;
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '../../../data/products.json');

class ProductRepository {
  async getAllProducts() {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  }
}

module.exports = new ProductRepository();
