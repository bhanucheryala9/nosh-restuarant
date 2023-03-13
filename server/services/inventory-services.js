const InventoryModel = require("../models/inventory-models.js");

exports.createInventory = async (inventory) => {
    return await InventoryModel.create(inventory);
  };

  exports.getInventoryItems = async () => {
    return await InventoryModel.find({});
  };