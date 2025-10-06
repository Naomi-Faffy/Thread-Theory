const { executeQuery } = require("../mysql-db.js");
const userService = require("./mysql-users.js");

async function handler(req, res) {

  if (req.method === "GET") {
    try {
      const {
        q = "",
        page = "1",
        limit = "10",
        sort = "created_at",
        order = "desc"
      } = req.query || {};

      const result = await userService.getAllCustomers({
        search: q,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort,
        order
      });

      if (result.success) {
        return res.status(200).json({
          data: result.data,
          page: result.pagination.page,
          limit: result.pagination.limit,
          total: result.pagination.total,
          totalPages: result.pagination.totalPages,
        });
      } else {
        return res.status(500).json({ message: result.message });
      }
    } catch (error) {
      console.error('Get customers error:', error);
      return res.status(500).json({ message: 'Failed to fetch customers' });
    }
  }
  if (req.method === "POST") {
    try {
      const { Custname, Custemail, Custnumber } = req.body;

      if (!Custname || !Custemail) {
        return res.status(400).json({ message: "Customer name and email are required" });
      }

      // Insert into customers table
      const result = await executeQuery(`
        INSERT INTO customers (Custname, Custemail, Custnumber)
        VALUES (?, ?, ?)
      `, [Custname, Custemail, Custnumber || null]);

      // Get the created customer
      const newCustomer = await executeQuery(`
        SELECT * FROM customers WHERE id = ?
      `, [result.insertId]);

      return res.status(201).json(newCustomer[0]);
    } catch (error) {
      console.error('Create customer error:', error);
      return res.status(500).json({ message: 'Failed to create customer' });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}

module.exports = handler;