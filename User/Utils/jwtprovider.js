const { sign } = require("jsonwebtoken");

exports.generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
