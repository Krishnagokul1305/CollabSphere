const { verify } = require("jsonwebtoken");
const prisma = require("../DB/prisma");

async function getAuthenticatedUser(req) {
  try {
    if (!req || !req.cookies || !req.cookies.token) {
      throw new Error("Unauthorized: No token provided.");
    }

    const decoded = verify(req.cookies.token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const tokenIssuedAt = decoded.iat * 1000;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { updatedAt: true },
    });

    if (!user) {
      throw new Error("Unauthorized: User not found.");
    }

    if (user.updatedAt.getTime() > tokenIssuedAt) {
      throw new Error(
        "Unauthorized: Password has changed recently. Please log in again!"
      );
    }

    return userId;
  } catch (error) {
    console.log(error.message);
    throw new Error("Unauthorized: Invalid token.");
  }
}

module.exports = getAuthenticatedUser;
