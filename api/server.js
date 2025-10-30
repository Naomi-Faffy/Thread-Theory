// Thread Theory API Server with MySQL
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('../mysql-db.js');
const userService = require('./mysql-users.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize MySQL database on startup
initializeDatabase().catch(console.error);

// Customers API route handler (keeping for backward compatibility)
const customersHandler = require('./customers.js');
app.all('/api/customers', customersHandler);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const { executeQuery } = require('../mysql-db.js');
    await executeQuery('SELECT 1');
    res.json({ ok: true, database: 'MySQL connected' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// User Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// User Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);

    if (result.success) {
      res.json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// User Logout endpoint
app.post('/api/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const result = await userService.logoutUser(token);
    res.json(result);
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get current user profile
app.get('/api/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const tokenResult = await userService.verifyToken(token);

    if (!tokenResult.success) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const userResult = await userService.getUserById(tokenResult.decoded.userId);
    res.json(userResult);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update user profile
app.put('/api/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const tokenResult = await userService.verifyToken(token);

    if (!tokenResult.success) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const result = await userService.updateUser(tokenResult.decoded.userId, req.body);
    res.json(result);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Creators API endpoints
app.post('/api/creators', async (req, res) => {
  try {
    const creatorData = req.body;

    // Validate required fields
    if (!creatorData.name || !creatorData.email || !creatorData.specialty) {
      return res.status(400).json({ success: false, message: 'Name, email, and specialty are required' });
    }

    // Insert creator into database
    const { executeQuery } = require('../mysql-db.js');
    const query = `
      INSERT INTO creators (name, email, specialty, experience, bio, phone, contact_preference, address, is_available, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE
        specialty = VALUES(specialty),
        experience = VALUES(experience),
        bio = VALUES(bio),
        phone = VALUES(phone),
        contact_preference = VALUES(contact_preference),
        address = VALUES(address),
        is_available = VALUES(is_available)
    `;

    const values = [
      creatorData.name,
      creatorData.email,
      creatorData.specialty,
      creatorData.experience || 0,
      creatorData.bio || '',
      creatorData.phone || '',
      creatorData.contact_preference || 'whatsapp',
      creatorData.address || '',
      creatorData.is_available ? 1 : 0
    ];

    await executeQuery(query, values);

    res.status(201).json({ success: true, message: 'Creator profile saved successfully' });
  } catch (error) {
    console.error('Save creator error:', error);
    res.status(500).json({ success: false, message: 'Failed to save creator profile' });
  }
});

// Get all creators
app.get('/api/creators', async (req, res) => {
  try {
    const { executeQuery } = require('../mysql-db.js');
    const creators = await executeQuery('SELECT * FROM creators WHERE is_available = 1 ORDER BY created_at DESC');

    res.json({ success: true, creators });
  } catch (error) {
    console.error('Get creators error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch creators' });
  }
});

// Legacy accounts endpoint (for backward compatibility)
app.post('/api/accounts', async (req, res) => {
  const { name, email, phone } = req.body || {};

  if (!name || (!email && !phone)) {
    return res.status(400).json({ error: 'name and email or phone are required' });
  }

  try {
    // Convert to new user registration format
    const userData = {
      name,
      email,
      phone,
      password: 'temp_password_' + Date.now(), // Temporary password for legacy support
      user_type: 'customer'
    };

    const result = await userService.registerUser(userData);

    if (result.success) {
      res.status(201).json({
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phone,
        createdAt: result.user.created_at
      });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    const { closeConnections } = require('../mysql-db.js');
    await closeConnections();
  } catch (_) {}
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Thread Theory API listening on port ${PORT}`);
  console.log(`Database: MySQL`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});