const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await authService.findUserByEmailAny(email);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: Invalid credentials' });
      }

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

  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
          message: 'Password must be at least 8 characters, contain at least one uppercase letter, and one special character (!, @, #, $, %, ^, &, *)' 
        });
      }

      const existingUser = await authService.findUserByEmailAny(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        id: Date.now(),
        username: email,
        password: hashedPassword,
        firstName: name,
        registrationDate: new Date().toISOString().split('T')[0]
      };

      await authService.addUser(newUser);

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          firstName: newUser.firstName
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

module.exports = new AuthController();
