const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const { emailRegex } = require("../../utils/constants");

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

UserSchema.path("email").validate(function (email) {
  return emailRegex.test(email);
}, "Enter a valid email");

module.exports = UserSchema;
