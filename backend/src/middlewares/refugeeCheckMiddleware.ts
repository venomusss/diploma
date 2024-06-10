import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

const refugeeCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refugeeId } = req.body;

    if (!refugeeId) {
      return res.status(400).json({
        status: 400,
        message: "Refugee ID is required",
      });
    }

    const refugee = await User.findById(refugeeId);

    if (!refugee) {
      return res.status(404).json({
        status: 404,
        message: "Refugee not found",
      });
    }

    if (refugee.role !== "REFUGEE") {
      return res.status(403).json({
        status: 403,
        message: "User is not a refugee",
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

export default refugeeCheckMiddleware;
