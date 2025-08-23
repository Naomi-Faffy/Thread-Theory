const mongoose = require("mongoose");
const { connectToDatabase } = require("../db.js");

async function handler(req, res) {
  await connectToDatabase();
  // Define schema & model
  const CustomerSchema = new mongoose.Schema({
    Custname: String,
    Custemail: String,
    Custnumber: String,
  }, { timestamps: true });
  const Customer = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

  if (req.method === "GET") {
    const {
      q = "",
      page = "1",
      limit = "10",
      sort = "createdAt",
      order = "desc"
    } = req.query || {};

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const search = String(q || "").trim();

    // Build filter
    const filter = search
      ? {
          $or: [
            { Custname: { $regex: search, $options: "i" } },
            { Custemail: { $regex: search, $options: "i" } },
            { Custnumber: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Ensure createdAt exists for sorting if model is new
    if (!Customer.schema.paths.createdAt) {
      Customer.schema.add({ createdAt: { type: Date, default: Date.now } });
    }

    const sortField = typeof sort === "string" ? sort : "createdAt";
    const sortDir = String(order).toLowerCase() === "asc" ? 1 : -1;

    const total = await Customer.countDocuments(filter);
    const results = await Customer.find(filter)
      .sort({ [sortField]: sortDir })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      data: results,
      page: pageNum,
      limit: pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    });
  }
  if (req.method === "POST") {
    const newCustomer = await Customer.create(req.body);
    return res.status(201).json(newCustomer);
  }
  res.status(405).json({ message: "Method not allowed" });
}

module.exports = handler;