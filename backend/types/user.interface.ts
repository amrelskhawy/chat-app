import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}
