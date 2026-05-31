// Dashboard controller - analytics and statistics
const pool = require('../config/db');

// Get dashboard stats for admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Total orders
    const totalOrdersResult = await pool.query('SELECT COUNT(*) as total FROM orders');
    const totalOrders = parseInt(totalOrdersResult.rows[0].total);

    // Total revenue
    const totalRevenueResult = await pool.query(
      'SELECT COALESCE(SUM(price), 0) as total FROM orders WHERE status = $1',
      ['Delivered']
    );
    const totalRevenue = parseFloat(totalRevenueResult.rows[0].total);

    // Most sold items
    const mostSoldResult = await pool.query(
      'SELECT cake_name, COUNT(*) as count FROM orders GROUP BY cake_name ORDER BY count DESC LIMIT 5'
    );
    const mostSold = mostSoldResult.rows;

    // Total users
    const totalUsersResult = await pool.query(
      "SELECT COUNT(*) as total FROM users WHERE role = 'user'"
    );
    const totalUsers = parseInt(totalUsersResult.rows[0].total);

    res.status(200).json({
      totalOrders,
      totalRevenue,
      totalUsers,
      mostSold
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get sales analytics
exports.getSalesAnalytics = async (req, res) => {
  try {
    const { period } = req.query; // 'daily', 'weekly', 'monthly'

    let query;
    if (period === 'daily') {
      query = `SELECT DATE(created_at) as period, COUNT(*) as orders, COALESCE(SUM(price), 0) as revenue 
               FROM orders WHERE status = 'Delivered' 
               GROUP BY DATE(created_at) ORDER BY period DESC LIMIT 30`;
    } else if (period === 'weekly') {
      query = `SELECT DATE_TRUNC('week', created_at) as period, COUNT(*) as orders, COALESCE(SUM(price), 0) as revenue 
               FROM orders WHERE status = 'Delivered' 
               GROUP BY DATE_TRUNC('week', created_at) ORDER BY period DESC LIMIT 30`;
    } else {
      query = `SELECT DATE_TRUNC('month', created_at) as period, COUNT(*) as orders, COALESCE(SUM(price), 0) as revenue 
               FROM orders WHERE status = 'Delivered' 
               GROUP BY DATE_TRUNC('month', created_at) ORDER BY period DESC LIMIT 30`;
    }

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Sales analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user rewards
exports.getUserRewards = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      'SELECT * FROM rewards WHERE user_id = $1',
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Rewards not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};