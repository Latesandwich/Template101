const orderService = require('../services/orderService');

class OrderController {
  async createOrder(req, res) {
    try {
      const result = await orderService.createOrder(req.body);
      return res.status(200).json({ message: 'Order saved successfully', data: result });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      if (error.details) {
        return res.status(statusCode).json({ errors: error.details });
      }
      return res.status(statusCode).json({ errors: [error.message] });
    }
  }
}

module.exports = new OrderController();
