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
  startTime: {
    required: false,
    type: String,
    default: Date.now,
  },
  endTime: {
    required: false,
    type: String,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rewards", rewardsSchema);
