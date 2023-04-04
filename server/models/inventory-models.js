const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  id: String,
  productName: String,
  description: String,
  price: String,
  discount: Number,
  url:{
    type: String,
    required: false
  },
  isAvailable: Boolean,
  tax: Number,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
