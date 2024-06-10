import express from "express";
import { User } from "../models/user";
import { Post } from "../models/post";
import dotenv from "dotenv";
import volunteerCheckMiddleware from "../middlewares/volunteerCheckMiddleware";

dotenv.config();
const router = express.Router();

router.post("/create", volunteerCheckMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      refugeeIds,
      volunteerId,
      location,
      state,
      label,
      maxNumberOfRefugees,
    } = req.body;

    const newPost = await Post.create({
      title,
      description,
      refugeeIds,
      volunteerId,
      location,
      state,
      label,
      maxNumberOfRefugees,
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: "Post created successfully",
      request: newPost,
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
    const postId = req.params.id;

    const postExists = await Post.findById(postId);
    if (!postExists) {
      res.status(404).json({
        status: 404,
        message: "Post not found",
      });
      return;
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      status: 200,
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { label, state, search } = req.query;

    const filter: { [key: string]: any } = {};

    if (label) {
      filter.label = label;
    }

    if (state) {
      filter.state = state;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const posts = await Post.find(filter).populate("volunteerId");

    res.status(200).json({
      status: 200,
      success: true,
      message: "Posts retrieved successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate("volunteerId");

    if (!post) {
      res.status(404).json({
        status: 404,
        message: "Post not found",
      });
      return;
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Post retrieved successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.put("/:id", volunteerCheckMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      refugeeIds,
      volunteerId,
      location,
      state,
      label,
      maxNumberOfRefugees,
    } = req.body;

    const request = await Post.findById(id);
    if (!request) {
      res.status(404).json({
        status: 404,
        message: "Post not found",
      });
      return;
    }

    const updatedRequest = await Post.findByIdAndUpdate(
      id,
      {
        title,
        description,
        refugeeIds,
        volunteerId,
        location,
        state,
        label,
        maxNumberOfRefugees,
      },
      { new: true }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Post updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.get("/volonteer/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const { label, state, search } = req.query;

    const filter: { [key: string]: any } = {};

    if (volunteerId) {
      filter.volunteerId = volunteerId;
    }

    if (label) {
      filter.label = label;
    }

    if (state) {
      filter.state = state;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const posts = await Post.find(filter).populate("volunteerId");

    res.status(200).json({
      status: 200,
      success: true,
      message: "Posts retrieved successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

export default router;
