import express from "express";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.put("/update", async (req, res) => {
  try {
    const { email, name, phoneNumber, location, id } = req.body;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
      return;
    }

    if (email) user.email = email;
    if (name) user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (location) user.location = location;

    await user.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

export default router;
