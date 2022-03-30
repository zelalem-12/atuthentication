const mongoose = require("mongoose");

const {
  modelsName: { USERS },
} = require("../../utils/constants");

const UserSchema = require("./schema");
const userStaticFunctions = require("./static");
const userInstanceFunctions = require("./methods");

UserSchema.static(userStaticFunctions);
UserSchema.method(userInstanceFunctions);

module.exports = mongoose.model(USERS, UserSchema);
