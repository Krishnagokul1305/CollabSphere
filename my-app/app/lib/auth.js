import dbConnect from "@/app/lib/db";
import userModel from "@/app/lib/models/user.model";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account && account.provider === "google") {
        await dbConnect();
        let existingUser = await userModel.findOne({ email: token.email });

        if (!existingUser) {
          existingUser = await userModel.create({
            email: token.email,
            name: token.name,
            avatar: token.picture,
            role: "user",
          });
        }

        token.user = {
          id: existingUser._id.toString(),
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role,
          avatar: existingUser.avatar,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      console.log(session);
      return session;
    },
  },

  pages: {
    signIn: "/login",
    newUser: "/profile",
    signOut: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
