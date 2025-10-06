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
        INDEX idx_created_at (created_at)
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
        INDEX idx_created_at (created_at)
      )
    `);
    
    // Create user_sessions table for authentication
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        session_token VARCHAR(255) NOT NULL,
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
        quantity INT DEFAULT 1,
        price DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_product_id (product_id)
      )
    `);
    
    // Create votes table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS votes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        collection_id VARCHAR(255) NOT NULL,
        vote_type ENUM('like', 'dislike') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_collection (user_id, collection_id),
        INDEX idx_user_id (user_id),
        INDEX idx_collection_id (collection_id)
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
        shipping_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_order_number (order_number),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      )
    `);
    
    conn.release();
    console.log('Database tables created successfully');
    
  } catch (error) {
    console.error('Error initializing database:', error);
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
