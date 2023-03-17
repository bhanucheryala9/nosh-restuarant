const InventoryModel = require("../models/inventory-models.js");

exports.createInventory = async (inventory) => {
  return await InventoryModel.create(inventory);
};

exports.getInventoryItems = async () => {
  return await InventoryModel.find({});
};

exports.getInventoryItemByID = async (id) => {
  return await InventoryModel.find({ id: id });
};

exports.deleteInventoryItemByID = async (id) => {
  return await InventoryModel.findOneAndDelete({ id: id })
    .then(() => {
      return InventoryModel.find({ });
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};

exports.updateInventoryItemID = async (payload) => {
  return await InventoryModel.findOneAndUpdate(
    { id: payload.id },
    {
      $set: {
        productName: payload.productName,
        description: payload.description,
        price: payload.price,
        discount: payload.discount,
        isAvailable: payload.isAvailable,
        tax: payload.tax,
        category: payload.category,
      },
    }
  )
    .then(() => {
      return InventoryModel.find({ });
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};
