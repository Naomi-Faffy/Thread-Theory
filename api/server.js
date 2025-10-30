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

// Get creator by email
app.get('/api/creators/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { executeQuery } = require('../mysql-db.js');
    const creators = await executeQuery('SELECT * FROM creators WHERE email = ? AND is_available = 1', [email]);

    if (creators.length === 0) {
      return res.status(404).json({ success: false, message: 'Creator not found' });
    }

    res.json({ success: true, creator: creators[0] });
  } catch (error) {
    console.error('Get creator error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch creator' });
  }
});

// Update creator profile
app.put('/api/creators/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const { executeQuery } = require('../mysql-db.js');

    // Build dynamic update query
    const fields = [];
    const values = [];

    if (updateData.specialty !== undefined) {
      fields.push('specialty = ?');
      values.push(updateData.specialty);
    }
    if (updateData.experience !== undefined) {
      fields.push('experience = ?');
      values.push(updateData.experience);
    }
    if (updateData.bio !== undefined) {
      fields.push('bio = ?');
      values.push(updateData.bio);
    }
    if (updateData.phone !== undefined) {
      fields.push('phone = ?');
      values.push(updateData.phone);
    }
    if (updateData.contact_preference !== undefined) {
      fields.push('contact_preference = ?');
      values.push(updateData.contact_preference);
    }
    if (updateData.address !== undefined) {
      fields.push('address = ?');
      values.push(updateData.address);
    }
    if (updateData.is_available !== undefined) {
      fields.push('is_available = ?');
      values.push(updateData.is_available ? 1 : 0);
    }

    if (fields.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields to update' });
    }

    fields.push('updated_at = NOW()');
    values.push(email);

    const query = `UPDATE creators SET ${fields.join(', ')} WHERE email = ?`;
    const result = await executeQuery(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Creator not found' });
    }

    res.json({ success: true, message: 'Creator profile updated successfully' });
  } catch (error) {
    console.error('Update creator error:', error);
    res.status(500).json({ success: false, message: 'Failed to update creator profile' });
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

// Cart API endpoints
app.get('/api/cart', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const tokenResult = await userService.verifyToken(token);

    if (!tokenResult.success) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { executeQuery } = require('../mysql-db.js');
    const cartItems = await executeQuery(`
      SELECT c.*, u.name as creator_name
      FROM cart c
      LEFT JOIN users u ON c.creator_id = u.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
    `, [tokenResult.decoded.userId]);

    res.json({ success: true, cart: cartItems });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch cart' });
  }
});

app.post('/api/cart', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const tokenResult = await userService.verifyToken(token);

    if (!tokenResult.success) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { product_id, product_name, product_image, quantity, price, size, color, creator_id } = req.body;

    if (!product_id || !product_name || !quantity || !price) {
      return res.status(400).json({ success: false, message: 'Product ID, name, quantity, and price are required' });
    }

    const { executeQuery } = require('../mysql-db.js');

    // Check if item already exists in cart
    const existingItems = await executeQuery(`
      SELECT id, quantity FROM cart
      WHERE user_id = ? AND product_id = ? AND size = ? AND color = ?
    `, [tokenResult.decoded.userId, product_id, size || null, color || null]);

    if (existingItems.length > 0) {
      // Update quantity
      await executeQuery(`
        UPDATE cart SET quantity = quantity + ?, updated_at = NOW()
        WHERE id = ?
      `, [quantity, existingItems[0].id]);
    } else {
      // Insert new item
      await executeQuery(`
        INSERT INTO cart (user_id, product_id, product_name, product_image, quantity, price, size, color, creator_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `, [
        tokenResult.decoded.userId,
        product_id,
        product_name,
        product_image || null,
        quantity,
        price,
        size || null,
        color || null,
        creator_id || null
      ]);
    }

    res.json({ success: true, message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: 'Failed to add item to cart' });
  }
});

app.put('/api/cart/:itemId', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const tokenResult = await userService.verifyToken(token);

    if (!tokenResult.success) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Valid quantity is required' });
    }

    const { executeQuery } = require('../mysql-db.js');
    const result = await executeQuery(`
      UPDATE cart SET quantity = ?, updated_at = NOW()
      WHERE id = ? AND user_id = ?
    `, [quantity, itemId, tokenResult.decoded.userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.json({ success: true, message: 'Cart item updated successfully' });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ success: false, message: 'Failed to update cart item' });
  }
});

app.delete('/api/cart/:itemId', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const tokenResult = await userService.verifyToken(token);

    if (!tokenResult.success) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { itemId } = req.params;
    const { executeQuery } = require('../mysql-db.js');
    const result = await executeQuery(`
      DELETE FROM cart WHERE id = ? AND user_id = ?
    `, [itemId, tokenResult.decoded.userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.json({ success: true, message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ success: false, message: 'Failed to remove item from cart' });
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