const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { executeQuery, getConnection } = require('../mysql-db.js');

class UserService {
  
  // Register a new user (customer or creator)
  async registerUser(userData) {
    const { name, email, phone, password, user_type, specialty, experience_years, bio, address } = userData;
    
    try {
      // Validate required fields
      if (!name || !email || !password || !user_type) {
        throw new Error('Name, email, password, and user type are required');
      }
      
      if (!['customer', 'creator'].includes(user_type)) {
        throw new Error('User type must be either "customer" or "creator"');
      }
      
      // Check if user already exists
      const existingUser = await executeQuery(
        'SELECT id FROM users WHERE email = ?',
        [email.toLowerCase()]
      );
      
      if (existingUser.length > 0) {
        throw new Error('User with this email already exists');
      }
      
      // Hash password
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(password, saltRounds);
      
      // Insert new user
      const result = await executeQuery(`
        INSERT INTO users (name, email, phone, password_hash, user_type, specialty, experience_years, bio, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        name.trim(),
        email.toLowerCase().trim(),
        phone || null,
        password_hash,
        user_type,
        specialty || null,
        experience_years || 0,
        bio || null,
        address || null
      ]);
      
      const userId = result.insertId;

      // If it's a creator, also add to creators table
      if (user_type === 'creator') {
        await executeQuery(`
          INSERT INTO creators (name, email, specialty, experience, bio, phone, contact_preference, address, is_available, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
          ON DUPLICATE KEY UPDATE
            specialty = VALUES(specialty),
            experience = VALUES(experience),
            bio = VALUES(bio),
            phone = VALUES(phone),
            contact_preference = VALUES(contact_preference),
            address = VALUES(address),
            is_available = VALUES(is_available),
            updated_at = NOW()
        `, [
          name.trim(),
          email.toLowerCase().trim(),
          specialty || null,
          experience_years || 0,
          bio || null,
          phone || null,
          'whatsapp', // default contact preference
          address || null,
          1 // is_available
        ]);
      }

      // If it's a customer, also add to customers table for backward compatibility
      if (user_type === 'customer') {
        await executeQuery(`
          INSERT INTO customers (Custname, Custemail, Custnumber, user_id)
          VALUES (?, ?, ?, ?)
        `, [name.trim(), email.toLowerCase().trim(), phone || null, userId]);
      }
      
      // Get the created user (without password)
      const newUser = await executeQuery(`
        SELECT id, name, email, phone, user_type, specialty, experience_years, bio, address, created_at
        FROM users WHERE id = ?
      `, [userId]);
      
      return {
        success: true,
        user: newUser[0],
        message: 'User registered successfully'
      };
      
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    }
  }
  
  // Login user
  async loginUser(email, password) {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Get user with password hash
      const users = await executeQuery(`
        SELECT id, name, email, phone, password_hash, user_type, specialty, experience_years, bio, address, created_at
        FROM users WHERE email = ? AND is_active = TRUE
      `, [email.toLowerCase()]);
      
      if (users.length === 0) {
        throw new Error('Invalid email or password');
      }
      
      const user = users[0];
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, userType: user.user_type },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '7d' }
      );
      
      // Store session in database
      await executeQuery(`
        INSERT INTO user_sessions (user_id, session_token, expires_at)
        VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))
      `, [user.id, token]);
      
      // Remove password hash from response
      delete user.password_hash;
      
      return {
        success: true,
        user,
        token,
        message: 'Login successful'
      };
      
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    }
  }
  
  // Get user by ID
  async getUserById(userId) {
    try {
      const users = await executeQuery(`
        SELECT id, name, email, phone, user_type, specialty, experience_years, bio, address, created_at
        FROM users WHERE id = ? AND is_active = TRUE
      `, [userId]);
      
      if (users.length === 0) {
        return { success: false, message: 'User not found' };
      }
      
      return { success: true, user: users[0] };
      
    } catch (error) {
      console.error('Get user error:', error);
      return { success: false, message: 'Failed to get user' };
    }
  }
  
  // Update user profile
  async updateUser(userId, updateData) {
    try {
      const { name, phone, specialty, experience_years, bio, address } = updateData;
      
      const result = await executeQuery(`
        UPDATE users 
        SET name = COALESCE(?, name),
            phone = COALESCE(?, phone),
            specialty = COALESCE(?, specialty),
            experience_years = COALESCE(?, experience_years),
            bio = COALESCE(?, bio),
            address = COALESCE(?, address)
        WHERE id = ? AND is_active = TRUE
      `, [name, phone, specialty, experience_years, bio, address, userId]);
      
      if (result.affectedRows === 0) {
        return { success: false, message: 'User not found or no changes made' };
      }
      
      // Get updated user
      const updatedUser = await this.getUserById(userId);
      return updatedUser;
      
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, message: 'Failed to update user' };
    }
  }
  
  // Get all customers (for admin/API compatibility)
  async getAllCustomers(filters = {}) {
    try {
      const { search = '', page = 1, limit = 10, sort = 'created_at', order = 'desc' } = filters;
      
      const offset = (page - 1) * limit;
      const sortOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
      
      let whereClause = 'WHERE u.user_type = "customer" AND u.is_active = TRUE';
      let params = [];
      
      if (search) {
        whereClause += ' AND (u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)';
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }
      
      // Get total count
      const countQuery = `
        SELECT COUNT(*) as total
        FROM users u
        ${whereClause}
      `;
      const countResult = await executeQuery(countQuery, params);
      const total = countResult[0].total;
      
      // Get paginated results
      const dataQuery = `
        SELECT u.id, u.name, u.email, u.phone, u.created_at,
               c.id as customer_id, c.Custname, c.Custemail, c.Custnumber
        FROM users u
        LEFT JOIN customers c ON u.id = c.user_id
        ${whereClause}
        ORDER BY u.${sort} ${sortOrder}
        LIMIT ? OFFSET ?
      `;
      params.push(limit, offset);
      
      const results = await executeQuery(dataQuery, params);
      
      return {
        success: true,
        data: results,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
      
    } catch (error) {
      console.error('Get customers error:', error);
      return { success: false, message: 'Failed to get customers' };
    }
  }
  
  // Verify JWT token
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
      
      // Check if session exists and is not expired
      const sessions = await executeQuery(`
        SELECT user_id FROM user_sessions 
        WHERE session_token = ? AND expires_at > NOW()
      `, [token]);
      
      if (sessions.length === 0) {
        throw new Error('Session expired or invalid');
      }
      
      return { success: true, decoded };
      
    } catch (error) {
      return { success: false, message: 'Invalid token' };
    }
  }
  
  // Logout user (invalidate session)
  async logoutUser(token) {
    try {
      await executeQuery('DELETE FROM user_sessions WHERE session_token = ?', [token]);
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, message: 'Logout failed' };
    }
  }
}

module.exports = new UserService();
