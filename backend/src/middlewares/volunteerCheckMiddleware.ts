import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

const volunteerCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { volunteerId } = req.body;

    if (!volunteerId) {
      return res.status(400).json({
        status: 400,
        message: "Volunteer ID is required",
      });
    }

    const volunteer = await User.findById(volunteerId);

    if (!volunteer) {
      return res.status(404).json({
        status: 404,
        message: "Volunteer not found",
      });
    }

    if (volunteer.role !== "VOLUNTEER") {
      return res.status(403).json({
        status: 403,
        message: "User is not a volunteer",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
};

export default volunteerCheckMiddleware;
