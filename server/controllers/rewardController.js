// Reward controller - Handles reward-related operations
const Reward = require('../models/Reward');
const { AppError, asyncHandler } = require('../middlewares/errorHandler');

// Get user's rewards
exports.getUserRewards = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const reward = await Reward.getByUserId(user_id);

  if (!reward) {
    throw new AppError('Rewards not found', 404);
  }

  res.status(200).json({
    success: true,
    data: reward
  });
});

// Get all rewards (admin only)
exports.getAllRewards = asyncHandler(async (req, res) => {
  const rewards = await Reward.getAll();

  res.status(200).json({
    success: true,
    data: rewards
  });
});

// Get top users by rewards (admin only)
exports.getTopUsers = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;
  const topUsers = await Reward.getTopUsers(parseInt(limit));

  res.status(200).json({
    success: true,
    data: topUsers
  });
});

// Redeem points
exports.redeemPoints = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const { points } = req.body;

  if (!points || points <= 0) {
    throw new AppError('Points must be greater than 0', 400);
  }

  const reward = await Reward.getByUserId(user_id);
  if (!reward || reward.points < points) {
    throw new AppError('Insufficient points', 400);
  }

  const updated = await Reward.redeemPoints(user_id, points);

  res.status(200).json({
    success: true,
    message: `Successfully redeemed ${points} points`,
    data: updated
  });
});