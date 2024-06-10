import express from "express";
import { User } from "../models/user";
import { Request } from "../models/request";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findById(id);

    if (!data) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "User retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const requestExists = await User.findById(userId);
    if (!requestExists) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
      return;
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      status: 200,
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

export default router;
