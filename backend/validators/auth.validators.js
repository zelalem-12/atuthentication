const { body } = require("express-validator");
const { strongPasswordRegex } = require("../utils/constants");

const userValidator = {
  firstName: body("firstName").isString().withMessage("First name is required"),
  lastName: body("lastName").isString().withMessage("Last name is required"),
  email: body("email")
    .isEmail()
    .customSanitizer((email) => !email || email.toLowerCase())
    .withMessage(`Please provide a valid email`),
  password: body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters")
    .custom((value) => strongPasswordRegex.test(value))
    .withMessage(
      "Password should contain a lower case letter, an upper case letter, a number and one of these symbols (!@#$%^&*)."
    ),
  token: body("token").isString().withMessage("Reset token is required"),
};

const signupValidator = () => {
  return [
    userValidator.firstName,
    userValidator.lastName,
    userValidator.email,
    userValidator.password,
  ];
};
const loginValidator = () => {
  return [userValidator.email, userValidator.password];
};

module.exports = {
  signupValidator,
  loginValidator,
};
