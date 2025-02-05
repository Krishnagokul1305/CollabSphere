const { verify } = require("jsonwebtoken");

async function getAuthenticatedUser(req) {
  try {
    if (!req || !req.cookies || !req.cookies.token) {
      throw new Error("Unauthorized: No token provided.");
    }
    const decoded = verify(req.cookies.token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.log(error);
    throw new Error("Unauthorized: Invalid token.");
  }
}

module.exports = getAuthenticatedUser;
