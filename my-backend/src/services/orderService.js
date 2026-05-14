const productService = require('./productService');
const orderRepository = require('../repositories/orderRepository');

class OrderService {
  async createOrder({ cart, email, creditCard, user_id }) {
    const errors = [];

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      errors.push('Cart is required and must contain items');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Invalid email format');
    }

    if (!creditCard || !/^\d{16}$/.test(creditCard)) {
      errors.push('Credit card must be exactly 16 digits');
    }

    if (!user_id || typeof user_id !== 'number') {
      errors.push('Valid user_id is required');
    }

    if (errors.length > 0) {
      const error = new Error('Order validation failed');
      error.statusCode = 400;
      error.details = errors;
      throw error;
    }

    const products = await productService.getAllProducts();
    let total = 0;

    for (const item of cart) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        errors.push('Each cart item must have a valid productId and positive quantity');
        continue;
      }

      const product = products.find(p => p.id === item.productId || p.id == item.productId);
      if (!product) {
        errors.push(`Product with id ${item.productId} not found`);
      } else {
        total += product.price * item.quantity;
      }
    }

    if (errors.length > 0) {
      const error = new Error('Order validation failed');
      error.statusCode = 400;
      error.details = errors;
      throw error;
    }

    const creditCardLast4 = creditCard.slice(-4);
    const orderDate = new Date().toISOString();
    const orderId = await orderRepository.createOrder({
      userId: user_id,
      email,
      creditCardLast4,
      total,
      date: orderDate
    });

    for (const item of cart) {
      const product = products.find(p => p.id === item.productId || p.id == item.productId);
      await orderRepository.createOrderItem({
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });
    }

    return { orderId, total, date: orderDate };
  }
}

module.exports = new OrderService();
