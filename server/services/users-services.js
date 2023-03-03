const UsersModel = require("../models/users-models.js");

exports.createUsers = async (users) => {
    return await UsersModel.create(users);
  };