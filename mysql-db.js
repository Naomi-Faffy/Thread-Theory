const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

let connection = null;

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'threadtheory',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

async function connectToMySQL() {
  try {
    if (!connection) {
      connection = await pool.getConnection();
      console.log('MySQL connected successfully');
    }
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
}

// Initialize database and create tables
async function initializeDatabase() {
  try {
    const conn = await pool.getConnection();

    // Create database if it doesn't exist
    await conn.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await conn.execute(`USE ${dbConfig.database}`);

    console.log('Creating tables...');

    // Create users table for both customers and creators
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password_hash VARCHAR(255) NOT NULL,
        user_type ENUM('customer', 'creator') NOT NULL,
        specialty VARCHAR(255),
        experience_years INT DEFAULT 0,
        bio TEXT,
        address TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_user_type (user_type),
        INDEX idx_created_at (created_at),
        INDEX idx_is_active (is_active)
      )
    `);

    // Create customers table (for backward compatibility with existing API)
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Custname VARCHAR(255) NOT NULL,
        Custemail VARCHAR(255),
        Custnumber VARCHAR(20),
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_email (Custemail),
        INDEX idx_created_at (created_at),
        INDEX idx_user_id (user_id)
      )
    `);

    // Create user_sessions table for authentication
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        session_token VARCHAR(500) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_session_token (session_token),
        INDEX idx_user_id (user_id),
        INDEX idx_expires_at (expires_at)
      )
    `);

    // Create cart table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id VARCHAR(255) NOT NULL,
        product_name VARCHAR(255),
        product_image VARCHAR(500),
        quantity INT DEFAULT 1,
        price DECIMAL(10, 2),
        size VARCHAR(50),
        color VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_product_id (product_id),
        INDEX idx_created_at (created_at)
      )
    `);

    // Create votes table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS votes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        collection_id VARCHAR(255) NOT NULL,
        collection_name VARCHAR(255),
        vote_type ENUM('like', 'dislike') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_collection (user_id, collection_id),
        INDEX idx_user_id (user_id),
        INDEX idx_collection_id (collection_id),
        INDEX idx_vote_type (vote_type),
        INDEX idx_created_at (created_at)
      )
    `);

    // Create orders table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        order_number VARCHAR(255) UNIQUE NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
        shipping_address TEXT,
        billing_address TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_order_number (order_number),
        INDEX idx_status (status),
        INDEX idx_payment_status (payment_status),
        INDEX idx_created_at (created_at)
      )
    `);

    // Create order_items table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        product_image VARCHAR(500),
        quantity INT NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        size VARCHAR(50),
        color VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        INDEX idx_order_id (order_id),
        INDEX idx_product_id (product_id)
      )
    `);

    // Create creator_profiles table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS creator_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        portfolio_images JSON,
        social_media JSON,
        certifications TEXT,
        awards TEXT,
        featured_work JSON,
        availability_status ENUM('available', 'busy', 'unavailable') DEFAULT 'available',
        hourly_rate DECIMAL(8, 2),
        commission_rate DECIMAL(5, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_profile (user_id),
        INDEX idx_availability_status (availability_status),
        INDEX idx_hourly_rate (hourly_rate)
      )
    `);

    // Create notifications table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
        is_read BOOLEAN DEFAULT FALSE,
        action_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_is_read (is_read),
        INDEX idx_type (type),
        INDEX idx_created_at (created_at)
      )
    `);

    // Create performance indexes
    await conn.execute(`CREATE INDEX IF NOT EXISTS idx_users_type_active ON users(user_type, is_active)`);
    await conn.execute(`CREATE INDEX IF NOT EXISTS idx_orders_user_status ON orders(user_id, status)`);
    await conn.execute(`CREATE INDEX IF NOT EXISTS idx_cart_user_product ON cart(user_id, product_id)`);
    await conn.execute(`CREATE INDEX IF NOT EXISTS idx_votes_collection_type ON votes(collection_id, vote_type)`);

    conn.release();
    console.log('✅ Database tables created successfully');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

// Get database connection from pool
async function getConnection() {
  return await pool.getConnection();
}

// Execute query with automatic connection handling
async function executeQuery(query, params = []) {
  const conn = await pool.getConnection();
  try {
    const [results] = await conn.execute(query, params);
    return results;
  } finally {
    conn.release();
  }
}

// Close all connections
async function closeConnections() {
  try {
    await pool.end();
    console.log('MySQL connections closed');
  } catch (error) {
    console.error('Error closing MySQL connections:', error);
  }
}

module.exports = {
  connectToMySQL,
  initializeDatabase,
  getConnection,
  executeQuery,
  closeConnections,
  pool
};
