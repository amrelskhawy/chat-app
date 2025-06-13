import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  profilePic: string; // Optional, can be undefined
  password: string;
  createdAt: Date;
}
