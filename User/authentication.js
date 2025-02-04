async function getAuthenticatedUser(context) {
  if (!context.req || !context.req.cookies || !context.req.cookies.token) {
    throw new Error("Unauthorized: No token provided.");
  }
  try {
    const decoded = verifyToken(context.req.cookies.token); // Decode token from cookies
    return decoded.userId;
  } catch (error) {
    throw new Error("Unauthorized: Invalid token.");
  }
}

module.exports = getAuthenticatedUser;
