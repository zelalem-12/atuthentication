const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).send({ errorCode: -1, errors: errors.errors });
};

module.exports = validator;
