import mongoose from "mongoose";
import { db, travelSchema } from "./db.js";

const checkTravelDb = () => {
  if (!db.models["Travel"]) {
    db.model("Travel", travelSchema);
  }
};

export const getTravel = async (req, res) => {
  try {
    checkTravelDb();

    const travelList = await db.model("Travel").find();

    res.status(200).json({
      message: "success",
      data: travelList,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const getTravelById = async (req, res) => {
  try {
    checkTravelDb();

    const { id } = req.params;

    const travel = await db.model("Travel").findById(id);

    if (!travel) {
      return res.status(404).json({
        message: "error",
        error: "Student not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: travel,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const createTravel = async (req, res) => {
  try {
    checkTravelDb();
    // Create a new Contact document using the form data
    const newTravel = await db.model("Travel").create(req.body);

    res.status(201).json({
      message: "success",
      data: newTravel,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const updateTravel = async (req, res) => {
  const { id } = req.params;

  try {
    checkTravelDb();

    const updatedTravel = await db.model("Travel").updateOne(
      {
        _id: id,
      },
      req.body
    );

    if (!updatedTravel) {
      return res.status(404).json({
        message: "error",
        error: "Travel not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: updatedTravel,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const deleteTravel = async (req, res) => {
  const { id } = req.params;

  try {
    checkTravelDb();

    const deletedTravel = await db.model("Travel").findOne({ _id: id });

    if (!deletedTravel) {
      return res.status(404).json({
        message: "error",
        error: "Travel not found",
      });
    }

    await db.model("Travel").deleteOne({ _id: id });

    res.status(200).json({
      message: "success",
      data: deletedTravel,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};
