// Inventory routes
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

// Public routes
router.get('/', inventoryController.getAllIngredients);

// Admin routes
router.post('/', verifyToken, verifyAdmin, inventoryController.addIngredient);
router.put('/:id', verifyToken, verifyAdmin, inventoryController.updateIngredientQuantity);
router.get('/low-stock', verifyToken, verifyAdmin, inventoryController.getLowStockItems);

module.exports = router;