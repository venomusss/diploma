import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests",
      required: true,
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const Report = mongoose.model("Reports", ReportSchema);
