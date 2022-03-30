const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your secret";

const authenticateMiddleWare = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    return res.status(401).send({
      message: "Authentication required",
    });

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  try {
    const user = await jwt.verify(token, JWT_SECRET);
    if (!user)
      return res.status(401).send({ message: "Authentication required" });

    const { _id, firstName, lastName, email } = user;
    req.user = { _id, firstName, lastName, email };
    next();
  } catch (err) {
    res
      .status(400)
      .send({ message: " Unable to authenticate!, Please try again later " });
  }
};

module.exports = {
  authenticateMiddleWare,
};
