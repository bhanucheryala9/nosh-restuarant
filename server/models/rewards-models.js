const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardsSchema = new Schema({
  id: String,
  rewardType: String,
  code: String,
  discountPercentage: Number,
  maxDiscountAmount: Number,
  minOrderPrice: Number,
  appliesTo: String,
  appliedCategory: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rewards", rewardsSchema);
