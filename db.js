import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
let conn = null;
export async function connectToDatabase() {
  if (conn) return conn;  // Reuse existing connection
  conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
  return conn;
}