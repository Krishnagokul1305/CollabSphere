const { JsonWebTokenError } = require("jsonwebtoken");

async function getAuthenticatedUser(context) {
  if (!context.req || !context.req.cookies || !context.req.cookies.token) {
    throw new Error("Unauthorized: No token provided.");
  }

  try {
    const decoded = verifyToken(context.req.cookies.token); // Decode token from cookies
    return decoded.userId;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new Error("Unauthorized: Token expired.");
    }
    throw new Error("Unauthorized: Invalid token.");
  }
}

module.exports = getAuthenticatedUser;
