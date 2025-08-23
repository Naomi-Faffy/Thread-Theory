const mongoose = require("mongoose");
const { connectToDatabase } = require("../db.js");

async function handler(req, res) {
  await connectToDatabase();
  // Define schema & model
  const CustomerSchema = new mongoose.Schema({
    Custname: String,
    Custemail: String,
    Custnumber: String,
  });
  const Customer = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

  if (req.method === "GET") {
    const customers = await Customer.find();
    return res.status(200).json(customers);
  }
  if (req.method === "POST") {
    const newCustomer = await Customer.create(req.body);
    return res.status(201).json(newCustomer);
  }
  res.status(405).json({ message: "Method not allowed" });
}

module.exports = handler;