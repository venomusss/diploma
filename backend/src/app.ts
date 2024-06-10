import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import requestRoutes from "./routes/requestRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import commentRoutes from "./routes/commentRoutes";
import reportRoutes from "./routes/reportRoutes";

const app: Application = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT: number = 8000;

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("🛢️  Connected To Database");
  } catch (error) {
    console.log("⚠️ Error to connect Database");
  }
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/requests", requestRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);
app.use("/reports", reportRoutes);
