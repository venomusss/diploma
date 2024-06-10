import express from "express";
import { User } from "../models/user";
import { Request } from "../models/request";
import dotenv from "dotenv";
import refugeeCheckMiddleware from "../middlewares/refugeeCheckMiddleware";

dotenv.config();
const router = express.Router();

router.post("/create", refugeeCheckMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      refugeeId,
      volunteerId,
      location,
      state,
      label,
    } = req.body;

    const refugeeExists = await User.findById(refugeeId);
    if (!refugeeExists) {
      res.status(404).json({
        status: 404,
        message: "Refugee not found",
      });
      return;
    }

    if (volunteerId) {
      const volunteerExists = await User.findById(volunteerId);
      if (!volunteerExists) {
        res.status(404).json({
          status: 404,
          message: "Volunteer not found",
        });
        return;
      }
    }

    const newRequest = await Request.create({
      title,
      description,
      refugeeId,
      volunteerId,
      location,
      state,
      label,
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: "Request created successfully",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.get("/refugee/:refugeeId", async (req, res) => {
  try {
    const { refugeeId } = req.params;

    const { label, state, search } = req.query;

    const filter: { [key: string]: any } = {};

    if (refugeeId) {
      filter.refugeeId = refugeeId;
    }

    if (label) {
      filter.label = label;
    }

    if (state) {
      filter.state = state;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const requests = await Request.find(filter)
      .populate("refugeeId")
      .populate("volunteerId");

    res.status(200).json({
      status: 200,
      success: true,
      message: "Requests retrieved successfully",
      requests,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const requestId = req.params.id;

    const requestExists = await Request.findById(requestId);
    if (!requestExists) {
      res.status(404).json({
        status: 404,
        message: "Request not found",
      });
      return;
    }

    await Request.findByIdAndDelete(requestId);

    res.status(200).json({
      status: 200,
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findById(id)
      .populate("refugeeId")
      .populate("volunteerId");

    if (!request) {
      res.status(404).json({
        status: 404,
        message: "Request not found",
      });
      return;
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Request retrieved successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.put("/:id", refugeeCheckMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      refugeeId,
      volunteerId,
      location,
      state,
      label,
    } = req.body;

    const request = await Request.findById(id);
    if (!request) {
      res.status(404).json({
        status: 404,
        message: "Request not found",
      });
      return;
    }

    const refugeeExists = await User.findById(refugeeId);
    if (!refugeeExists) {
      res.status(404).json({
        status: 404,
        message: "Refugee not found",
      });
      return;
    }

    if (volunteerId) {
      const volunteerExists = await User.findById(volunteerId);
      if (!volunteerExists) {
        res.status(404).json({
          status: 404,
          message: "Volunteer not found",
        });
        return;
      }
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      {
        title,
        description,
        refugeeId,
        volunteerId,
        location,
        state,
        label,
      },
      { new: true }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Request updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { label, state, search } = req.query;

    const filter: { [key: string]: any } = {};

    if (label) {
      filter.label = label;
    }

    if (state) {
      filter.state = state;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const requests = await Request.find(filter)
      .populate("refugeeId")
      .populate("volunteerId");

    res.status(200).json({
      status: 200,
      success: true,
      message: "Requests retrieved successfully",
      requests,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error && error.message.toString(),
    });
  }
});

export default router;
