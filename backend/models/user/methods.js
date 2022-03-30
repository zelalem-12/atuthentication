async function register() {
  try {
    const newUser = await this.save();

    return newUser.clean();
  } catch (err) {
    console.log(err.messgae);
    throw {
      message: err.message || "An Error occured while registering user",
      status: 500,
    };
  }
}

function clean() {
  const userObj = this.toObject();
  delete userObj.password;
  return userObj;
}
module.exports = {
  register,
  clean,
};
