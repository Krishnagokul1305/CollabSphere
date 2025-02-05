const prisma = require("../DB/prisma");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../Utils/jwtprovider");
const { signInUser, clearCookie } = require("../Utils/cookie");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  async updateUser(_, arg, { userId }) {
    console.log(userId);
    try {
      if (!userId || userId !== arg.id) {
        throw new AuthenticationError(
          "Unauthorized access: You can only update your own data."
        );
      }

      // Proceed with updating the user data
      return await prisma.user.update({
        where: { id: arg.id },
        data: { name: arg.name },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteUser(_, arg, { userId }) {
    try {
      // Check if the user is authenticated
      if (!userId) {
        throw new AuthenticationError("Unauthorized Access: Please log in.");
      }

      // Ensure the user can only delete their own account
      if (userId !== arg.id) {
        throw new AuthenticationError(
          "Unauthorized access: You can delete only your account."
        );
      }

      // Proceed with deleting the user
      await prisma.user.delete({ where: { id: arg.id } });
      return true;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  },

  async register(_, arg, context) {
    try {
      if (!context || !context.res) {
        throw new Error("Missing response object in context.");
      }

      // Hash the user's password
      const hashedPassword = await bcrypt.hash(arg.input.password, 10);

      // Create a new user in the database
      const newUser = await prisma.user.create({
        data: {
          email: arg.input.email,
          name: arg.input.name,
          role: arg.input.role,
          password: hashedPassword,
        },
      });

      const token = generateToken(newUser.id);

      signInUser(context, token);

      return {
        success: true,
        message: "Registration successful",
        user: newUser,
      };
    } catch (error) {
      throw new Error("Error registering user: " + error.message);
    }
  },

  async login(_, arg, context) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: arg.input.email },
      });

      // If user doesn't exist, throw an error
      if (!user) {
        throw new AuthenticationError("Invalid credentials.");
      }

      // Compare the provided password with the stored password hash
      const isPasswordValid = await bcrypt.compare(
        arg.input.password,
        user.password
      );

      // If password is incorrect, throw an error
      if (!isPasswordValid) {
        throw new AuthenticationError("Invalid credentials.");
      }

      // Generate a token for the logged-in user
      const token = generateToken(user.id);

      signInUser(context, token);

      return {
        success: true,
        message: "Login successful",
        user,
      };
    } catch (error) {
      throw new Error("Error logging in: " + error.message);
    }
  },
  async logout(_, args, { res }) {
    await clearCookie(res);
    return true;
  },
};
