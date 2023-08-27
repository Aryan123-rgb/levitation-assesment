import { UserModel } from "../db/users";
import express from "express";

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json("Fill all the fields");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const userDoc = await UserModel.create({
      firstname,
      lastname,
      email,
      password,
    });

    return res.json(userDoc).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json("Server crashed");
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    const userDoc = await UserModel.findOne({ email,password });
    if (userDoc) {
      return res.json(userDoc);
    } else return res.status(400).json("User not found");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Server crashed");
  }
};
