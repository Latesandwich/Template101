const productService = require('../services/productService');
const db = require('../db');

class OrderController {
  async createOrder(req, res) {
    const { cart, email, creditCard, user_id } = req.body;
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

    // Validate user_id
    if (!user_id || typeof user_id !== 'number') {
      errors.push('Valid user_id is required');
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

      // Create tables if not exist
      db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          email TEXT,
          credit_card TEXT,
          total REAL,
          date TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id INTEGER,
          product_id INTEGER,
          quantity INTEGER,
          price REAL,
          FOREIGN KEY(order_id) REFERENCES orders(id)
        )`, (err) => {
          if (err) {
            return res.status(500).json({ errors: ['Failed to create tables'] });
          }

          // Insert order
          const stmt = db.prepare(`INSERT INTO orders (user_id, email, credit_card, total, date) VALUES (?, ?, ?, ?, ?)`, (err) => {
            if (err) {
              return res.status(500).json({ errors: ['Failed to prepare order insert'] });
            }
          });

          stmt.run(user_id, email, creditCard.slice(-4), total, new Date().toISOString(), function(err) {
            if (err) {
              return res.status(500).json({ errors: ['Failed to insert order'] });
            }
            const orderId = this.lastID;

            // Insert order items
            const itemStmt = db.prepare(`INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`, (err) => {
              if (err) {
                return res.status(500).json({ errors: ['Failed to prepare item insert'] });
              }
            });

            let itemsInserted = 0;
            for (let item of cart) {
              const product = products.find(p => p.id == item.productId);
              itemStmt.run(orderId, item.productId, item.quantity, product.price, (err) => {
                if (err) {
                  return res.status(500).json({ errors: ['Failed to insert order item'] });
                }
                itemsInserted++;
                if (itemsInserted === cart.length) {
                  itemStmt.finalize();
                  stmt.finalize();
                  return res.status(200).json({ message: 'Order saved successfully', orderId });
                }
              });
            }
          });
        });
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ errors: [`Failed to process order: ${message}`] });
    }
  }
}

module.exports = new OrderController();