const { verify, TokenExpiredError } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const prisma = require("../../DB/prisma");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.token) {
      return next(new AppError("Unauthorized: No token provided.", 401));
    }
    let decoded;
    try {
      decoded = verify(req.cookies.token, process.env.JWT_SECRET);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(
          new AppError(
            "Unauthorized: Token has expired. Please log in again.",
            401
          )
        );
      }
      return next(new AppError("Unauthorized: Invalid token.", 401));
    }

    const userId = decoded.id;
    const tokenIssuedAt = decoded.iat * 1000;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        updatedAt: true,
        email: true,
        name: true,
        avatar: true,
      },
    });

    if (!user) {
      return next(new AppError("Unauthorized: User not found.", 401));
    }

    if (user.updatedAt.getTime() > tokenIssuedAt) {
      return next(
        new AppError(
          "Unauthorized: Password changed recently. Please log in again!",
          401
        )
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

module.exports = authMiddleware;
