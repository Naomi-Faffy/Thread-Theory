const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
let conn = null;
async function connectToDatabase() {
  if (conn) return conn; // Reuse existing connection
  conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
  return conn;
}
module.exports = { connectToDatabase };