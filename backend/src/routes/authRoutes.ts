import express from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber, location } = req.body;

    const isEmailAlreadyExist = await User.findOne({ email });

    if (isEmailAlreadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email already in use",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      location,
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: "User created Successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Wrong password",
      });
      return;
    }

    const token = jwt.sign(
      { _id: isUserExist._id, email: isUserExist.email },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Login successful",
      token: token,
      user: {
        _id: isUserExist._id,
        email: isUserExist.email,
        name: isUserExist.name,
        role: isUserExist.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

export default router;
