const RewardsModel = require("../models/rewards-models.js");

exports.createRewards = async (rewards) => {
  return await RewardsModel.create(rewards);
};

exports.getRewardsItems = async () => {
  return await RewardsModel.find({});
};

exports.deleteRewardsItemByID = async (id) => {
  return await RewardsModel.findOneAndDelete({ id: id })
    .then(() => {
      return RewardsModel.find({});
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};

exports.updateRewardsItemID = async (payload) => {
  return await RewardsModel.findOneAndUpdate(
    { id: payload.id },
    {
      $set: {
        rewardType: payload.rewardType,
        code: payload.code,
        discountPercentage: payload.discountPercentage,
        maxDiscountAmount: payload.maxDiscountAmount,
        minOrderPrice: payload.minOrderPrice,
        appliesTo: payload.appliesTo,
      },
    }
  )
    .then(() => {
      return RewardsModel.find({});
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};
