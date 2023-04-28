const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  orderId: String,
  firstName: String,
  lastName: String,
  email: String,
  // phoneNumber: Number,
  address: {
    addressLine1: String,
    addressLine2: String,
    state: String,
    city: String,
    // zipcode: String
  },
  orderDetails: [
    {
      id: String,
      productName: String,
      category: String,
      price: Number,
      url: String,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  orderStatus: String,
  isPaid: Boolean,
  paymentId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", ordersSchema);
