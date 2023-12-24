import express from "express";
import cors from "cors";
import { connectDB, db, travelSchema } from "./db.js";
import { getTravel, getTravelById, createTravel, updateTravel, deleteTravel } from "./api.js";
import "dotenv/config";

connectDB();

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(new URL("public", import.meta.url).pathname));

// API routes
app.get("/", getTravel);
app.get("/:id", getTravelById);
app.post("/", createTravel);
app.patch("/:id", updateTravel);
app.delete("/:id", deleteTravel);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT || 3000}`);
});
