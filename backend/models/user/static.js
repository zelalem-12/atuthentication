const { modelsName } = require("../../utils/constants");

async function findUserByEmail(email) {
  const User = this.model(modelsName.USERS);
  try {
    const userDoc = await User.findOne({ email });
    return userDoc;
  } catch (err) {
    throw new Error({
      message: err.message,
      status: 5000,
    });
  }
}

module.exports = {
  findUserByEmail,
};
