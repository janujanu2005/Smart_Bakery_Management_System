const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

router.get('/', verifyToken, rewardController.getUserRewards);
router.post('/redeem', verifyToken, rewardController.redeemPoints);
router.get('/admin/all', verifyToken, verifyAdmin, rewardController.getAllRewards);
router.get('/admin/top-users', verifyToken, verifyAdmin, rewardController.getTopUsers);

module.exports = router;