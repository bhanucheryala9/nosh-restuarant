const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  credits:Number,
  address: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipcode: String,
  },
  type: String,
  subtype: String,
  salary: Number,
  about: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", usersSchema);
