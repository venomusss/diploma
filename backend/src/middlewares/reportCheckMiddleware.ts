import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

const reportCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { volunteer } = req.body;

    if (!volunteer) {
      return res.status(400).json({
        status: 400,
        message: "Volunteer ID is required",
      });
    }

    const volunteerData = await User.findById(volunteer);

    if (!volunteerData) {
      return res.status(404).json({
        status: 404,
        message: "Volunteer not found",
      });
    }

    if (volunteerData.role !== "VOLUNTEER") {
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

export default reportCheckMiddleware;
