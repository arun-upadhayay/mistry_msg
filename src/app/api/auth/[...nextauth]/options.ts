import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { promises } from "dns";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentils",
      name: "Credentils",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter you email",
        },

        password: {
          label: "Password",
          type: "password",
          value: "",
        },
      },
      async authorize(credentials: any, req): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("User not found");
          }
          if (!user.isVerified) {
            throw new Error("User not verified ! please first verify ");
          }
          const isPasswordCorrect = bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password ");
          }

          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
        if (token) {
            session.user._id = token._id;
            session.user.isverified = token.isverified;
            session.user.isAcceptingMessages = token.isAcceptingMessages;
            session.user.username = token.username;

        }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString()
        token.isverified = user.isverified;
        token.isAcceptingMessages = user.isAccepingMessages;
        token.username = user.username;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
