import express from "express";
import { User } from "../models/user";
import { Comment } from "../models/comment";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { content, commentator, target } = req.body;

    const comentatorExists = await User.findById(commentator);
    if (!comentatorExists) {
      return res.status(404).json({
        status: 404,
        message: "Comentator not found",
      });
    }

    const targetExists = await User.findById(target);
    if (!targetExists) {
      return res.status(404).json({
        status: 404,
        message: "Target user not found",
      });
    }

    const newComment = await Comment.create({
      content,
      commentator,
      target,
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.get("/:targetId", async (req, res) => {
  try {
    const { targetId } = req.params;

    const comments = await Comment.find({ target: targetId })
      .populate("commentator")
      .populate("target")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Comments retrieved successfully",
      comments,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

export default router;
