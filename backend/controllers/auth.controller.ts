import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Here you would typically handle user registration logic
  res
    .status(201)
    .send({ message: "User registered successfully", user: { username } });
};

export const signup = (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
  } catch (err) {}

  // Here you would typically handle user registration logic
  res.status(201).send({
    message: "User registered successfully",
    user: { fullName, email },
  });
};

export const logout = (req: Request, res: Response) => {
  const { username } = req.body;
  // Here you would typically handle user logout logic
  res
    .status(201)
    .send({ message: "User registered successfully", user: { username } });
};
