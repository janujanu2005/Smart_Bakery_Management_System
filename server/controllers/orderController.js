// Order controller - handles order management
const pool = require('../config/db');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { cake_name, weight, message, pickup_time } = req.body;
    const user_id = req.user.id;

    // Validate input
    if (!cake_name || !weight || !pickup_time) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // Calculate price (example: $10 per kg)
    const price = parseFloat(weight) * 10;

    // Get image path if uploaded
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    // Insert order
    const orderResult = await pool.query(
      'INSERT INTO orders (user_id, cake_name, weight, message, image_url, pickup_time, price, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [user_id, cake_name, weight, message || null, image_url, pickup_time, price, 'Preparing']
    );

    const order = orderResult.rows[0];

    // Award reward points (1 point per dollar)
    const pointsToAdd = Math.floor(price);
    await pool.query(
      'UPDATE rewards SET points = points + $1 WHERE user_id = $2',
      [pointsToAdd, user_id]
    );

    // Deduct ingredients
    await deductIngredients(weight);

    res.status(201).json({
      message: 'Order created successfully',
      order,
      pointsAwarded: pointsToAdd
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.*, u.name, u.email FROM orders o 
       JOIN users u ON o.user_id = u.id 
       ORDER BY o.created_at DESC`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT o.*, u.name, u.email FROM orders o 
       JOIN users u ON o.user_id = u.id 
       WHERE o.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Preparing', 'Ready', 'Delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated',
      order: result.rows[0]
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to deduct ingredients
async function deductIngredients(weight) {
  try {
    // Deduct based on weight (example ratio per kg)
    const ingredientDeduction = {
      'Flour': weight * 0.3,
      'Sugar': weight * 0.2,
      'Eggs': weight * 0.5,
      'Butter': weight * 0.15
    };

    for (const [ingredientName, amount] of Object.entries(ingredientDeduction)) {
      const ingredientResult = await pool.query(
        'SELECT * FROM ingredients WHERE name = $1',
        [ingredientName]
      );

      if (ingredientResult.rows.length > 0) {
        const ingredient = ingredientResult.rows[0];
        await pool.query(
          'UPDATE ingredients SET quantity = quantity - $1 WHERE id = $2',
          [amount, ingredient.id]
        );
      }
    }
  } catch (error) {
    console.error('Deduct ingredients error:', error);
  }
}