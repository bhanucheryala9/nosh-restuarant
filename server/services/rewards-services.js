const RewardsModel = require("../models/rewards-models.js");

exports.createRewards = async (rewards) => {
    return await RewardsModel.create(rewards);
  };

  exports.getRewardsItems = async () => {
    return await RewardsModel.find({});
  };