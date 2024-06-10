import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

export const User = mongoose.model("Users", UserSchema);
