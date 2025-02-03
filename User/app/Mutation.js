const prisma = require("../DB/prisma");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../Utils/jwtprovider");
const { signInUser } = require("../Utils/cookie");
const { AuthenticationError } = require("apollo-server-express"); // Ensure this is imported
const getAuthenticatedUser = require("../authentication");

module.exports = {
  async createUser(_, arg) {
    try {
      const hashedPassword = await bcrypt.hash(arg.input.password, 10);
      return await prisma.user.create({
        data: {
          email: arg.input.email,
          name: arg.input.name,
          role: arg.input.role,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  },

  async updateUser(_, arg, context) {
    const userId = getAuthenticatedUser(context); // Get logged-in user's ID

    if (userId !== arg.id) {
      throw new Error("Unauthorized: You can only update your own account.");
    }

    try {
      return await prisma.user.update({
        where: { id: arg.id },
        data: { name: arg.name },
      });
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  },

  async deleteUser(_, arg, context) {
    const userId = getAuthenticatedUser(context);

    if (userId !== arg.id) {
      throw new Error("Unauthorized: You can only delete your own account.");
    }

    try {
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
      const hashedPassword = await bcrypt.hash(arg.input.password, 10);
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

      if (!user) {
        throw new AuthenticationError("Invalid credentials.");
      }

      const isPasswordValid = await bcrypt.compare(
        arg.input.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new AuthenticationError("Invalid credentials.");
      }

      const token = generateToken(user.id);
      console.log(token);
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
};
