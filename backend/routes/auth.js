const express = require("express");
const router = express.Router();

//validators
const validator = require("../validators");
const {
  signupValidator,
  loginValidator,
} = require("../validators/auth.validators");

//controllers
const { loginUser, createUser } = require("../controllers/auth");

router.post("/login", loginValidator(), validator, loginUser);

router.post("/signup", signupValidator(), validator, createUser);

module.exports = router;
