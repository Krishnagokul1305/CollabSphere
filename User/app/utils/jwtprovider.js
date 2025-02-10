const { sign } = require("jsonwebtoken");

exports.generateToken = (id, expires) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expires,
  });
};
