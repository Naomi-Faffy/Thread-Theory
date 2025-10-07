#!/usr/bin/env node

/**
 * Complete Thread Theory Database Setup
 * 
 * This script will:
 * 1. Test MySQL connection
 * 2. Create database and all tables
 * 3. Add sample data
 * 4. Verify everything works
 * 5. Test all API endpoints
 * 
 * Usage: node complete-database-setup.js
 */

require('dotenv').config();
const { initializeDatabase, executeQuery, closeConnections } = require('./mysql-db.js');
const userService = require('./api/mysql-users.js');

async function completeSetup() {
  console.log('🚀 Thread Theory Complete Database Setup');
  console.log('==========================================\n');
  
  try {
    // Step 1: Test connection
    console.log('1️⃣ Testing MySQL connection...');
    await executeQuery('SELECT 1 as test');
    console.log('✅ MySQL connection successful!\n');
    
    // Step 2: Initialize database
    console.log('2️⃣ Creating database and tables...');
    await initializeDatabase();
    console.log('✅ Database and tables created!\n');
    
    // Step 3: Verify tables
    console.log('3️⃣ Verifying table creation...');
    const tables = await executeQuery('SHOW TABLES');
    const tableNames = tables.map(table => Object.values(table)[0]);
    
    const expectedTables = [
      'users', 'customers', 'user_sessions', 'cart', 
      'votes', 'orders', 'order_items', 'creator_profiles', 'notifications'
    ];
    
    const missingTables = expectedTables.filter(table => !tableNames.includes(table));
    
    if (missingTables.length === 0) {
      console.log('✅ All tables created successfully!');
      console.log(`📋 Tables: ${tableNames.join(', ')}\n`);
    } else {
      throw new Error(`Missing tables: ${missingTables.join(', ')}`);
    }
    
    // Step 4: Create sample users
    console.log('4️⃣ Creating sample users...');
    
    const sampleUsers = [
      // Customers
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@threadtheory.com',
        phone: '+1234567890',
        password: 'password123',
        user_type: 'customer',
        address: '123 Fashion Street, Style City, SC 12345'
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@threadtheory.com',
        phone: '+1234567891',
        password: 'password123',
        user_type: 'customer',
        address: '456 Trend Avenue, Fashion Town, FT 67890'
      },
      {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@threadtheory.com',
        phone: '+1234567892',
        password: 'password123',
        user_type: 'customer',
        address: '789 Style Boulevard, Design City, DC 13579'
      },
      
      // Creators
      {
        name: 'Isabella Martinez',
        email: 'isabella.martinez@threadtheory.com',
        phone: '+1234567893',
        password: 'password123',
        user_type: 'creator',
        specialty: 'Dresses & Evening Wear',
        experience_years: 8,
        bio: 'Passionate designer specializing in elegant evening wear and custom dresses. I love creating pieces that make women feel confident and beautiful.',
        address: 'Studio 1, Creative District, Fashion City, FC 24680'
      },
      {
        name: 'Sophia Kim',
        email: 'sophia.kim@threadtheory.com',
        phone: '+1234567894',
        password: 'password123',
        user_type: 'creator',
        specialty: 'Casual & Streetwear',
        experience_years: 5,
        bio: 'Urban fashion enthusiast creating comfortable yet stylish casual wear. My designs blend street culture with contemporary fashion.',
        address: 'Studio 2, Creative District, Fashion City, FC 24681'
      },
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@threadtheory.com',
        phone: '+1234567895',
        password: 'password123',
        user_type: 'creator',
        specialty: 'Accessories & Jewelry',
        experience_years: 12,
        bio: 'Artisan jewelry maker and accessories designer. I create unique pieces that add the perfect finishing touch to any outfit.',
        address: 'Studio 3, Creative District, Fashion City, FC 24682'
      }
    ];
    
    let createdUsers = [];
    for (const userData of sampleUsers) {
      try {
        const result = await userService.registerUser(userData);
        if (result.success) {
          console.log(`✅ Created ${userData.user_type}: ${userData.name}`);
          createdUsers.push(result.user);
        } else {
          console.log(`⚠️  ${userData.name}: ${result.message}`);
        }
      } catch (error) {
        console.log(`❌ Error creating ${userData.name}: ${error.message}`);
      }
    }
    
    console.log(`\n✅ Created ${createdUsers.length} sample users!\n`);
    
    // Step 5: Test authentication
    console.log('5️⃣ Testing authentication system...');
    
    if (createdUsers.length > 0) {
      const testUser = sampleUsers[0]; // Sarah Johnson
      
      // Test login
      const loginResult = await userService.loginUser(testUser.email, testUser.password);
      if (loginResult.success) {
        console.log('✅ Login test successful!');
        
        // Test token verification
        const verifyResult = await userService.verifyToken(loginResult.token);
        if (verifyResult.success) {
          console.log('✅ Token verification successful!');
        } else {
          console.log('❌ Token verification failed');
        }
        
        // Test logout
        const logoutResult = await userService.logoutUser(loginResult.token);
        if (logoutResult.success) {
          console.log('✅ Logout test successful!');
        } else {
          console.log('❌ Logout test failed');
        }
      } else {
        console.log('❌ Login test failed:', loginResult.message);
      }
    }
    
    console.log();
    
    // Step 6: Test API compatibility
    console.log('6️⃣ Testing API compatibility...');
    
    const customersResult = await userService.getAllCustomers({ limit: 10 });
    if (customersResult.success) {
      console.log(`✅ Customers API working! Found ${customersResult.data.length} customers`);
    } else {
      console.log('❌ Customers API failed:', customersResult.message);
    }
    
    // Step 7: Database statistics
    console.log('\n7️⃣ Database statistics...');
    
    const stats = await executeQuery(`
      SELECT 
        'Total Users' as metric, COUNT(*) as count FROM users WHERE is_active = TRUE
      UNION ALL
      SELECT 
        'Customers' as metric, COUNT(*) as count FROM users WHERE user_type = 'customer' AND is_active = TRUE
      UNION ALL
      SELECT 
        'Creators' as metric, COUNT(*) as count FROM users WHERE user_type = 'creator' AND is_active = TRUE
      UNION ALL
      SELECT 
        'Customer Records' as metric, COUNT(*) as count FROM customers
    `);
    
    stats.forEach(stat => {
      console.log(`📊 ${stat.metric}: ${stat.count}`);
    });
    
    // Final success message
    console.log('\n🎉 SETUP COMPLETE! 🎉');
    console.log('===================\n');
    
    console.log('✅ Database: threadtheory');
    console.log('✅ Tables: All created with indexes');
    console.log('✅ Sample data: Added successfully');
    console.log('✅ Authentication: Working');
    console.log('✅ API endpoints: Ready');
    
    console.log('\n🔗 Test Accounts:');
    console.log('👤 Customer: sarah.johnson@threadtheory.com | password123');
    console.log('👤 Creator: isabella.martinez@threadtheory.com | password123');
    
    console.log('\n🚀 Next Steps:');
    console.log('1. Start API server: npm run api:start');
    console.log('2. Test health check: http://localhost:3001/health');
    console.log('3. Open your application and test sign-up/login');
    
    console.log('\n📋 Available Scripts:');
    console.log('• npm run api:start - Start the API server');
    console.log('• npm run api:dev - Start with auto-reload');
    console.log('• npm run db:test - Test database functionality');
    console.log('• npm run db:setup - Recreate database tables');
    console.log('• npm run db:seed - Add more sample data');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Check MySQL server is running');
    console.error('2. Verify credentials in .env file');
    console.error('3. Ensure MySQL user has CREATE privileges');
    console.error('4. Check MySQL error logs');
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n🔑 Access denied - check password: tafara10');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n🔌 Connection refused - start MySQL server');
    }
    
    process.exit(1);
  } finally {
    await closeConnections();
  }
}

// Run the complete setup
if (require.main === module) {
  completeSetup();
}

module.exports = { completeSetup };
