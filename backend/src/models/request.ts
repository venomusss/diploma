import mongoose from "mongoose";
import { User } from "./user";

const RequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    refugeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
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
  },
  { timestamps: true }
);

export const Request = mongoose.model("Request", RequestSchema);
