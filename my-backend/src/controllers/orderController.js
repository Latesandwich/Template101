const productService = require('../services/productService');
const fs = require('fs').promises;
const path = require('path');

class OrderController {
  async createOrder(req, res) {
    const { cart, email, creditCard } = req.body;
    const errors = [];

    // Validate cart items
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      errors.push('Cart is required and must contain items');
    } else {
      for (let item of cart) {
        if (!item.productId || !item.quantity || item.quantity <= 0) {
          errors.push('Each cart item must have a valid productId and positive quantity');
          break; // Stop at first invalid item for simplicity
        }
      }
    }

    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('Invalid email format');
    }

    // Validate 16-digit credit card number
    const ccRegex = /^\d{16}$/;
    if (!creditCard || !ccRegex.test(creditCard)) {
      errors.push('Credit card must be exactly 16 digits');
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      // Calculate total
      let total = 0;
      const products = await productService.getAllProducts();
      for (let item of cart) {
        const product = products.find(p => p.id == item.productId);
        if (!product) {
          errors.push(`Product with id ${item.productId} not found`);
        } else {
          total += product.price * item.quantity;
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Save order
      const order = {
        id: Date.now(),
        cart,
        email,
        creditCard: creditCard.slice(-4), // Store only last 4 digits for security
        total,
        date: new Date()
      };

      const ordersPath = path.join(__dirname, '../../data/orders.json');
      let orders = [];
      try {
        const data = await fs.readFile(ordersPath, 'utf8');
        orders = JSON.parse(data);
      } catch (e) {
        // File doesn't exist or is invalid, start with empty array
      }
      orders.push(order);
      await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));

      return res.status(200).json({ message: 'Order saved successfully', orderId: order.id });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ errors: [`Failed to save order: ${message}`] });
    }
  }
}

module.exports = new OrderController();