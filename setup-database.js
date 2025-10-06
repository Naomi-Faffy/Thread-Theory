#!/usr/bin/env node

/**
 * Database Setup Script for Thread Theory
 * 
 * This script initializes the MySQL database with all required tables
 * for the Thread Theory application.
 * 
 * Usage: node setup-database.js
 */

require('dotenv').config();
const { initializeDatabase, executeQuery, closeConnections } = require('./mysql-db.js');

async function setupDatabase() {
  console.log('🚀 Starting Thread Theory Database Setup...\n');
  
  try {
    // Initialize database and create tables
    console.log('📊 Creating database and tables...');
    await initializeDatabase();
    console.log('✅ Database and tables created successfully!\n');
    
    // Verify tables were created
    console.log('🔍 Verifying table creation...');
    const tables = await executeQuery('SHOW TABLES');
    
    console.log('📋 Created tables:');
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`   - ${tableName}`);
    });
    
    console.log('\n📝 Table structures:');
    
    // Show users table structure
    console.log('\n👥 Users table:');
    const usersStructure = await executeQuery('DESCRIBE users');
    usersStructure.forEach(col => {
      console.log(`   ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''} ${col.Key ? `(${col.Key})` : ''}`);
    });
    
    // Show customers table structure
    console.log('\n🛍️  Customers table:');
    const customersStructure = await executeQuery('DESCRIBE customers');
    customersStructure.forEach(col => {
      console.log(`   ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''} ${col.Key ? `(${col.Key})` : ''}`);
    });
    
    // Show other tables
    const otherTables = ['user_sessions', 'cart', 'votes', 'orders'];
    for (const tableName of otherTables) {
      console.log(`\n📊 ${tableName} table:`);
      const structure = await executeQuery(`DESCRIBE ${tableName}`);
      structure.forEach(col => {
        console.log(`   ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''} ${col.Key ? `(${col.Key})` : ''}`);
      });
    }
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Update your .env file with correct MySQL credentials');
    console.log('2. Start the API server: npm run api:start');
    console.log('3. Test the health endpoint: http://localhost:3001/health');
    console.log('\n🔗 Available API endpoints:');
    console.log('   POST /api/register - Register new user');
    console.log('   POST /api/login - User login');
    console.log('   GET /api/profile - Get user profile');
    console.log('   PUT /api/profile - Update user profile');
    console.log('   POST /api/logout - User logout');
    console.log('   GET /api/customers - Get customers list');
    console.log('   POST /api/customers - Create customer');
    console.log('   GET /health - Health check');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Make sure MySQL server is running');
    console.error('2. Check your .env file has correct database credentials');
    console.error('3. Ensure the database user has CREATE privileges');
    console.error('4. Verify network connectivity to MySQL server');
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n🔑 Access denied - check username and password in .env');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n🔌 Connection refused - is MySQL server running?');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n🗄️  Database does not exist - will be created automatically');
    }
    
    process.exit(1);
  } finally {
    await closeConnections();
  }
}

// Run the setup
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };
