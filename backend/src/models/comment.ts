import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    commentator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comments", CommentSchema);
