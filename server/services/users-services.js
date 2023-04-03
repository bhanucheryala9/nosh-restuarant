const UsersModel = require("../models/users-models.js");
const MailService = require("../mail-service");
exports.createUsers = async (users) => {
  return await UsersModel.create(users);
};

exports.getsUsers = async (users) => {
  return await UsersModel.find({});
};

exports.getUsersByID = async (id) => {
  return await UsersModel.find({ email: id });
};

exports.deleteUserByID = async (id) => {
  return await UsersModel.findOneAndDelete({ id: id })
    .then(() => {
      return UsersModel.find({ type: "employee" });
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};
