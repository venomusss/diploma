import mongoose from "mongoose";
import { User } from "./user";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    refugeeIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: [],
    },
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    location: {
      lng: {
        type: Number,
        required: false,
      },
      lat: {
        type: Number,
        required: false,
      },
    },
    state: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    maxNumberOfRefugees: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Posts", PostSchema);
