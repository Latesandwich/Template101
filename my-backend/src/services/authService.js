const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');
const userServiceClient = require('./userServiceClient');

class AuthService {
  async findUserByEmailAny(email) {
    const userFromMain = await userServiceClient.getUserByEmail(email);
    if (userFromMain) return userFromMain;

    const userFromAuth = await authRepository.findUserByEmailInAuthFile(email);
    if (userFromAuth) return userFromAuth;

    return null;
  }

  async login(email, password) {
    if (!email || !password) {
      const error = new Error('Email and password are required');
      error.statusCode = 400;
      throw error;
    }

    const user = await this.findUserByEmailAny(email);
    if (!user) {
      const error = new Error('Unauthorized: Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Unauthorized: Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.username },
      process.env.JWT_SECRET || 'your-very-secure-secret',
      { expiresIn: '1h' }
    );

    return { token, user };
  }

  async register(name, email, password) {
    if (!name || !email || !password) {
      const error = new Error('Name, email, and password are required');
      error.statusCode = 400;
      throw error;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const error = new Error('Invalid email format');
      error.statusCode = 400;
      throw error;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      const error = new Error('Password must be at least 8 characters, contain at least one uppercase letter, and one special character (!, @, #, $, %, ^, &, *)');
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await this.findUserByEmailAny(email);
    if (existingUser) {
      const error = new Error('Email already registered');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      username: email,
      password: hashedPassword,
      firstName: name,
      registrationDate: new Date().toISOString().split('T')[0]
    };

    await authRepository.addUser(newUser);

    return {
      id: newUser.id,
      username: newUser.username,
      firstName: newUser.firstName
    };
  }
}

module.exports = new AuthService();
