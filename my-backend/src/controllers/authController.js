const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

// NOTE: As a Security Engineer, I must warn that MD5 (used in your test data) is cryptographically broken.
// This controller is implemented using bcrypt and JWT as per best practices.
// To use this with the generated data, the MD5 hashes would need to be replaced with bcrypt hashes.

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await authService.findUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: Invalid credentials' });
      }

      // In a real scenario, user.password would be a bcrypt hash.
      // Since the test data uses MD5, bcrypt.compare will fail unless we update the data.
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Unauthorized: Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.username },
        process.env.JWT_SECRET || 'your-very-secure-secret',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        status: 'success',
        token
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = new AuthController();
