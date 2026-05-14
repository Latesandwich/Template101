const authService = require('../services/authService');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.status(200).json({
        status: 'success',
        token: result.token
      });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await authService.register(name, email, password);

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        user
      });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = new AuthController();
