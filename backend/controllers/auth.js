const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "your secret";

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (await User.findUserByEmail(email))
      return res
        .status(400)
        .send({ success: false, message: `${email}  already exists` });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ firstName, lastName, email, password: hash });
    await user.register();
    res
      .status(201)
      .send({ success: true, message: "User registered Successfully" });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message || "An error occured! Please try again",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByEmail(email);
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .send({ success: false, message: "Wrong password" });

    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "48h" }
    );

    res.status(200).send({ token, success: true });
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ success: false, message: err.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
