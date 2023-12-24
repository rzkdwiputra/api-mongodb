import mongoose from "mongoose";
import { nanoid } from "nanoid";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    minPoolSize: 10,
    maxPoolSize: 400,
  });
};

export const db = mongoose.connection.useDb("travel_db", {
  useCache: true,
});

export const travelSchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(8),
  },
  nama: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  tujuan: {
    type: String,
    required: true,
  },
  harga: {
    type: String,
    required: true,
  },
  jumlah: {
    type: Number,
    required: true,
  },
  member: {
    type: Number,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});
