// Ingredient model - Database interactions for ingredients
const pool = require('../config/database');

class Ingredient {
  // Create new ingredient
  static async create(name, quantity, unit, low_stock_threshold) {
    const query = `
      INSERT INTO ingredients (name, quantity, unit, low_stock_threshold)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query(query, [name, quantity, unit, low_stock_threshold]);
    return result.rows[0];
  }

  // Get ingredient by ID
  static async findById(id) {
    const query = 'SELECT * FROM ingredients WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Get ingredient by name
  static async findByName(name) {
    const query = 'SELECT * FROM ingredients WHERE name = $1';
    const result = await pool.query(query, [name]);
    return result.rows[0];
  }

  // Get all ingredients
  static async getAll() {
    const query = 'SELECT * FROM ingredients ORDER BY name ASC';
    const result = await pool.query(query);
    return result.rows;
  }

  // Update ingredient quantity
  static async updateQuantity(id, quantity) {
    const query = 'UPDATE ingredients SET quantity = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [quantity, id]);
    return result.rows[0];
  }

  // Deduct ingredient quantity
  static async deductQuantity(id, amount) {
    const query = 'UPDATE ingredients SET quantity = quantity - $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [amount, id]);
    return result.rows[0];
  }

  // Get low stock items
  static async getLowStockItems() {
    const query = `
      SELECT * FROM ingredients 
      WHERE quantity < low_stock_threshold 
      ORDER BY quantity ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Delete ingredient
  static async delete(id) {
    const query = 'DELETE FROM ingredients WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Ingredient;