// Reward model - Database interactions for rewards
const pool = require('../config/database');

class Reward {
  // Get user rewards
  static async getByUserId(user_id) {
    const query = 'SELECT * FROM rewards WHERE user_id = $1';
    const result = await pool.query(query, [user_id]);
    return result.rows[0];
  }

  // Create reward record
  static async create(user_id, points = 0) {
    const query = `
      INSERT INTO rewards (user_id, points)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await pool.query(query, [user_id, points]);
    return result.rows[0];
  }

  // Add points to user
  static async addPoints(user_id, points) {
    const query = `
      UPDATE rewards 
      SET points = points + $1, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [points, user_id]);
    return result.rows[0];
  }

  // Redeem points
  static async redeemPoints(user_id, points) {
    const query = `
      UPDATE rewards 
      SET points = points - $1, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2 AND points >= $1
      RETURNING *
    `;
    const result = await pool.query(query, [points, user_id]);
    return result.rows[0];
  }

  // Get all rewards (admin)
  static async getAll() {
    const query = `
      SELECT r.*, u.name, u.email 
      FROM rewards r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.points DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Get top users by points
  static async getTopUsers(limit = 10) {
    const query = `
      SELECT r.user_id, u.name, u.email, r.points 
      FROM rewards r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.points DESC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  }
}

module.exports = Reward;