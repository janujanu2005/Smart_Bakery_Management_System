// Admin middleware - Role-based access control
const User = require('../models/User');

// Verify admin role
exports.verifyAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required' });
    }

    next();
  } catch (error) {
    console.error('Admin verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify ownership (user can only access their own data)
exports.verifyOwnership = (req, res, next) => {
  try {
    const resourceOwnerId = parseInt(req.params.userId || req.body.user_id);
    const requesterId = req.user.id;

    if (requesterId !== resourceOwnerId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You can only access your own data' });
    }

    next();
  } catch (error) {
    console.error('Ownership verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};