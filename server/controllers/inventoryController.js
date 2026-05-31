// Inventory controller - manages ingredients and stock
const pool = require('../config/db');

// Get all ingredients
exports.getAllIngredients = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ingredients ORDER BY name');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Get ingredients error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new ingredient (admin only)
exports.addIngredient = async (req, res) => {
  try {
    const { name, quantity, unit, low_stock_threshold } = req.body;

    if (!name || !quantity || !unit) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const result = await pool.query(
      'INSERT INTO ingredients (name, quantity, unit, low_stock_threshold) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, parseFloat(quantity), unit, low_stock_threshold || 10]
    );

    res.status(201).json({
      message: 'Ingredient added successfully',
      ingredient: result.rows[0]
    });
  } catch (error) {
    console.error('Add ingredient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update ingredient quantity (admin only)
exports.updateIngredientQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({ message: 'Quantity required' });
    }

    const result = await pool.query(
      'UPDATE ingredients SET quantity = $1 WHERE id = $2 RETURNING *',
      [parseFloat(quantity), id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json({
      message: 'Ingredient updated',
      ingredient: result.rows[0]
    });
  } catch (error) {
    console.error('Update ingredient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get low stock items (admin only)
exports.getLowStockItems = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM ingredients WHERE quantity < low_stock_threshold ORDER BY quantity ASC'
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Get low stock items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};