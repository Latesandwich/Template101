const fs = require('fs').promises;
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '../../../data/products.json');

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

  async getProductsByCategory(category) {
    try {
      const products = await this.getAllProducts();
      if (!category || category === 'All') return products;
      
      return products.filter(p => 
        (p.name && p.name.toLowerCase().includes(category.toLowerCase())) ||
        (p.category && p.category.toLowerCase() === category.toLowerCase())
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService();
