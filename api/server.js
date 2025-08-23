// Simple Express API for accounts
require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Customers API route handler
const customersHandler = require('./customers.js');
app.all('/api/customers', customersHandler);

// Mongo connection
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI in .env');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
}

app.get('/health', async (req, res) => {
  try {
    await connect();
    await client.db('admin').command({ ping: 1 });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// POST /api/accounts  { name, email?, phone? }
app.post('/api/accounts', async (req, res) => {
  const { name, email, phone } = req.body || {};

  if (!name || (!email && !phone)) {
    return res.status(400).json({ error: 'name and email or phone are required' });
  }

  try {
    await connect();
    const db = client.db(process.env.DB_NAME || 'ThreadTheory');
    const accounts = db.collection('Accounts');

    // Ensure unique indexes exist (email and phone)
    try {
      await accounts.createIndex({ email: 1 }, { unique: true, sparse: true });
      await accounts.createIndex({ phone: 1 }, { unique: true, sparse: true });
    } catch (_) {}

    // Check duplicates by email or phone if provided
    const conditions = [];
    if (email) conditions.push({ email });
    if (phone) conditions.push({ phone });

    if (conditions.length) {
      const existing = await accounts.findOne({ $or: conditions });
      if (existing) {
        return res.status(409).json({ error: 'Account already exists' });
      }
    }

    const doc = {
      name,
      email: email || null,
      phone: phone || null,
      createdAt: new Date(),
    };

    const result = await accounts.insertOne(doc);
    res.status(201).json({ id: result.insertedId, ...doc });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try { await client.close(); } catch (_) {}
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});