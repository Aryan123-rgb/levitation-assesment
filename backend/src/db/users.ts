import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
});

export const UserModel = model('User',UserSchema);