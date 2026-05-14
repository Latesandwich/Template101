const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const databasePath = path.join(__dirname, '../store.db');
const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  }
});

class OrderRepository {
  _run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  }

  async ensureTables() {
    await this._run(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      email TEXT,
      credit_card TEXT,
      total REAL,
      date TEXT
    )`);

    await this._run(`CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      price REAL,
      FOREIGN KEY(order_id) REFERENCES orders(id)
    )`);
  }

  async createOrder({ userId, email, creditCardLast4, total, date }) {
    await this.ensureTables();
    const result = await this._run(
      `INSERT INTO orders (user_id, email, credit_card, total, date) VALUES (?, ?, ?, ?, ?)`,
      [userId, email, creditCardLast4, total, date]
    );
    return result.lastID;
  }

  async createOrderItem({ orderId, productId, quantity, price }) {
    await this._run(
      `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
      [orderId, productId, quantity, price]
    );
  }
}

module.exports = new OrderRepository();
