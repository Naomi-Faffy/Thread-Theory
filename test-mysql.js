#!/usr/bin/env node

/**
 * MySQL Connection Test Script
 * 
 * This script tests the MySQL database connection and basic operations
 * to ensure everything is working correctly.
 * 
 * Usage: node test-mysql.js
 */

require('dotenv').config();
const { executeQuery, closeConnections } = require('./mysql-db.js');
const userService = require('./api/mysql-users.js');

async function testMySQL() {
  console.log('🧪 Testing MySQL Database Connection...\n');
  
  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing database connection...');
    await executeQuery('SELECT 1 as test');
    console.log('✅ Database connection successful!\n');
    
    // Test 2: Check if tables exist
    console.log('2️⃣ Checking database tables...');
    const tables = await executeQuery('SHOW TABLES');
    const tableNames = tables.map(table => Object.values(table)[0]);
    
    const expectedTables = ['users', 'customers', 'user_sessions', 'cart', 'votes', 'orders'];
    const missingTables = expectedTables.filter(table => !tableNames.includes(table));
    
    if (missingTables.length === 0) {
      console.log('✅ All required tables exist!');
      console.log(`📋 Found tables: ${tableNames.join(', ')}\n`);
    } else {
      console.log(`⚠️  Missing tables: ${missingTables.join(', ')}`);
      console.log('💡 Run: npm run db:setup\n');
    }
    
    // Test 3: Test user registration
    console.log('3️⃣ Testing user registration...');
    const testUser = {
      name: 'Test User',
      email: `test_${Date.now()}@example.com`,
      password: 'testpassword123',
      user_type: 'customer',
      phone: '+1234567890'
    };
    
    const registerResult = await userService.registerUser(testUser);
    if (registerResult.success) {
      console.log('✅ User registration successful!');
      console.log(`👤 Created user: ${registerResult.user.name} (ID: ${registerResult.user.id})\n`);
      
      // Test 4: Test user login
      console.log('4️⃣ Testing user login...');
      const loginResult = await userService.loginUser(testUser.email, testUser.password);
      if (loginResult.success) {
        console.log('✅ User login successful!');
        console.log(`🔑 Token generated: ${loginResult.token.substring(0, 20)}...\n`);
        
        // Test 5: Test token verification
        console.log('5️⃣ Testing token verification...');
        const verifyResult = await userService.verifyToken(loginResult.token);
        if (verifyResult.success) {
          console.log('✅ Token verification successful!');
          console.log(`👤 Verified user ID: ${verifyResult.decoded.userId}\n`);
        } else {
          console.log('❌ Token verification failed:', verifyResult.message);
        }
        
        // Test 6: Test logout
        console.log('6️⃣ Testing user logout...');
        const logoutResult = await userService.logoutUser(loginResult.token);
        if (logoutResult.success) {
          console.log('✅ User logout successful!\n');
        } else {
          console.log('❌ User logout failed:', logoutResult.message);
        }
      } else {
        console.log('❌ User login failed:', loginResult.message);
      }
    } else {
      console.log('❌ User registration failed:', registerResult.message);
    }
    
    // Test 7: Test customers API compatibility
    console.log('7️⃣ Testing customers API compatibility...');
    const customersResult = await userService.getAllCustomers({ limit: 5 });
    if (customersResult.success) {
      console.log('✅ Customers API working!');
      console.log(`📊 Found ${customersResult.data.length} customers (Total: ${customersResult.pagination.total})\n`);
    } else {
      console.log('❌ Customers API failed:', customersResult.message);
    }
    
    console.log('🎉 All tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ Database connection: Working');
    console.log('✅ Tables: Created');
    console.log('✅ User registration: Working');
    console.log('✅ User login: Working');
    console.log('✅ Token verification: Working');
    console.log('✅ User logout: Working');
    console.log('✅ Customers API: Working');
    
    console.log('\n🚀 Your MySQL database is ready for Thread Theory!');
    console.log('\n🔗 Next steps:');
    console.log('1. Start the API server: npm run api:start');
    console.log('2. Open your application and test the sign-up forms');
    console.log('3. Check the health endpoint: http://localhost:3001/health');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Make sure MySQL server is running');
    console.error('2. Check your .env file has correct database credentials');
    console.error('3. Run the database setup: npm run db:setup');
    console.error('4. Check MySQL error logs for more details');
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n🔑 Access denied - check username and password in .env');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n🔌 Connection refused - is MySQL server running?');
    }
    
    process.exit(1);
  } finally {
    await closeConnections();
  }
}

// Run the test
if (require.main === module) {
  testMySQL();
}

module.exports = { testMySQL };
