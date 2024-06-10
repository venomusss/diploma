import express from "express";
import { User } from "../models/user";
import { Report } from "../models/report";
import { Request } from "../models/request";
import dotenv from "dotenv";
import reportCheckMiddleware from "../middlewares/reportCheckMiddleware";

dotenv.config();
const router = express.Router();

router.post("/create", reportCheckMiddleware, async (req, res) => {
  try {
    const { volunteer, title, description, request, images } = req.body;

    if (volunteer) {
      const volunteerExists = await User.findById(volunteer);
      if (!volunteerExists) {
        res.status(404).json({
          status: 404,
          message: "Volunteer not found",
        });
        return;
      }
    }

    const report = await Report.create({
      volunteer,
      title,
      description,
      request,
      images: images,
    });

    await Request.findByIdAndUpdate(request, { state: "COMPLETED" });

    res.status(201).json({
      status: 201,
      success: true,
      message: "Report created successfully",
      request: report,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.get("/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;

    const reports = await Report.find({ volunteer: volunteerId }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Reports retrieved successfully",
      reports,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const reports = await Report.findById(id).populate("volunteer").sort({
      updatedAt: -1,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Report retrieved successfully",
      reports,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

export default router;
