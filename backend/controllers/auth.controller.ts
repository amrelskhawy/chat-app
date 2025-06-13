import UserModel from "@models/user.model";
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { generateToken } from "utils/generate-token";
import { hashPassword, isValidPassword } from "utils/password";
import { ILoginBody } from "types/auth.interface";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as ILoginBody;

  // Validate input fields
  if (!email || !password) {
    res.status(400).send({ message: "Email and password are required" });
    return;
  }

  try {
    const user = await UserModel.findOne({ email }); // Replace with actual user lookup logic

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "email or password is incorrect" });
      return;
    }

    const token = generateToken(user._id as string, res);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        profilePic: user.profilePic || "", // Ensure profilePic is always defined
      },
      token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password } = req.body;

  // Validate input fields
  if (!fullName || !email || !password) {
    res.status(400).send({ message: "All fields are required" });
    return;
  }

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

    // Generate a unique username
    let baseUsername = email.split("@")[0];
    let username = baseUsername;
    let counter = 1;

    // Check if username already exists and generate a unique one
    while (await UserModel.findOne({ username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // Create a new user instance
    const newUser = new UserModel({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(`${newUser._id as string}`, res);

    // Here you would typically handle user registration logic
    res.status(201).send({
      message: "User registered successfully",
      user: { fullName, email, username },
      token,
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
