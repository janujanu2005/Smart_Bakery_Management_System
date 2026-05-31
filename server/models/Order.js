// Order model - Database interactions for orders
const pool = require('../config/database');

class Order {
  // Create new order
  static async create(orderData) {
    const { user_id, cake_name, weight, message, image_url, pickup_time, price, status } = orderData;
    const query = `
      INSERT INTO orders (user_id, cake_name, weight, message, image_url, pickup_time, price, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const result = await pool.query(query, [user_id, cake_name, weight, message, image_url, pickup_time, price, status]);
    return result.rows[0];
  }

  // Get order by ID with user details
  static async findById(id) {
    const query = `
      SELECT o.*, u.name, u.email 
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Get user's orders
  static async getUserOrders(user_id) {
    const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [user_id]);
    return result.rows;
  }

  // Get all orders (admin)
  static async getAll() {
    const query = `
      SELECT o.*, u.name, u.email 
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Update order status
  static async updateStatus(id, status) {
    const query = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }

  // Get orders by status
  static async getByStatus(status) {
    const query = 'SELECT * FROM orders WHERE status = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [status]);
    return result.rows;
  }

  // Delete order
  static async delete(id) {
    const query = 'DELETE FROM orders WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Get total revenue
  static async getTotalRevenue() {
    const query = "SELECT COALESCE(SUM(price), 0) as total FROM orders WHERE status = 'Delivered'";
    const result = await pool.query(query);
    return result.rows[0].total;
  }

  // Get most sold items
  static async getMostSoldItems(limit = 5) {
    const query = `
      SELECT cake_name, COUNT(*) as count, SUM(price) as revenue
      FROM orders
      WHERE status = 'Delivered'
      GROUP BY cake_name
      ORDER BY count DESC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  }
}

module.exports = Order;