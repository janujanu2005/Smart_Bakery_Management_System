// Dashboard routes
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

// Admin routes
router.get('/stats', verifyToken, verifyAdmin, dashboardController.getDashboardStats);
router.get('/analytics', verifyToken, verifyAdmin, dashboardController.getSalesAnalytics);

// User routes
router.get('/rewards', verifyToken, dashboardController.getUserRewards);

module.exports = router;