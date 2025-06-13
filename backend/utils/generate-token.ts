import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";
dotenv.config();

export const generateToken = (userId: string, res: Response) => {
  if (!userId) {
    throw new Error("User ID is required to generate a token.");
  }

  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT secret key is not defined in environment variables.");
  }

  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "7d", // Token expiration time
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // Prevents client-side access to the cookie
    sameSite: "strict", // Helps prevent CSRF attacks
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  });

  return token;
};
