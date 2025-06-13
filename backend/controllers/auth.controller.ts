import UserModel from "@models/user.model";
import { Request, Response } from "express";
import { generateToken } from "utils/generate-token";
import { hashPassword, isValidPassword } from "utils/password";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  // Here you would typically handle user registration logic
  res
    .status(201)
    .send({ message: "User registered successfully", user: { username } });
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email }); // Replace with actual user lookup logic

    if (existingUser) {
      res.status(400).send({ message: "User already exists" });
      return;
    }

    // check if the password is valid
    const isValid = isValidPassword(password);

    if (!isValid.valid) {
      res.status(400).send({ message: isValid.error });
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      res.status(500).send({ message: "Error hashing password" });
      return;
    }

    // Create a new user instance
    const newUser = new UserModel({
      fullName,
      username: email.split("@")[0], // username generation
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      res.status(500).send({ message: "Error creating user" });
      return;
    }

    generateToken(`${newUser._id as string}`, res);

    await newUser.save();

    // Here you would typically handle user registration logic
    res.status(201).send({
      message: "User registered successfully",
      user: { fullName, email },
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;
  // Here you would typically handle user logout logic
  res
    .status(201)
    .send({ message: "User logged out successfully", user: { username } });
};
