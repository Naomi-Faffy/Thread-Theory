#!/usr/bin/env node

/**
 * Sample Data Seeder for Thread Theory
 * 
 * This script adds sample users (customers and creators) to the database
 * for testing purposes.
 * 
 * Usage: node seed-data.js
 */

require('dotenv').config();
const userService = require('./api/mysql-users.js');
const { closeConnections } = require('./mysql-db.js');

const sampleUsers = [
  // Sample Customers
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1234567890',
    password: 'password123',
    user_type: 'customer',
    address: '123 Fashion Street, Style City, SC 12345'
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1234567891',
    password: 'password123',
    user_type: 'customer',
    address: '456 Trend Avenue, Fashion Town, FT 67890'
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1234567892',
    password: 'password123',
    user_type: 'customer',
    address: '789 Style Boulevard, Design City, DC 13579'
  },
  
  // Sample Creators
  {
    name: 'Isabella Martinez',
    email: 'isabella.martinez@email.com',
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
    email: 'sophia.kim@email.com',
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
    email: 'ava.thompson@email.com',
    phone: '+1234567895',
    password: 'password123',
    user_type: 'creator',
    specialty: 'Accessories & Jewelry',
    experience_years: 12,
    bio: 'Artisan jewelry maker and accessories designer. I create unique pieces that add the perfect finishing touch to any outfit.',
    address: 'Studio 3, Creative District, Fashion City, FC 24682'
  },
  {
    name: 'Mia Davis',
    email: 'mia.davis@email.com',
    phone: '+1234567896',
    password: 'password123',
    user_type: 'creator',
    specialty: 'Sustainable Fashion',
    experience_years: 6,
    bio: 'Eco-conscious designer focused on sustainable and ethical fashion. Creating beautiful clothes while caring for our planet.',
    address: 'Studio 4, Creative District, Fashion City, FC 24683'
  },
  {
    name: 'Charlotte Wilson',
    email: 'charlotte.wilson@email.com',
    phone: '+1234567897',
    password: 'password123',
    user_type: 'creator',
    specialty: 'Formal & Business Wear',
    experience_years: 10,
    bio: 'Professional attire specialist creating sophisticated business wear and formal clothing for the modern professional.',
    address: 'Studio 5, Creative District, Fashion City, FC 24684'
  },
  {
    name: 'Amelia Brown',
    email: 'amelia.brown@email.com',
    phone: '+1234567898',
    password: 'password123',
    user_type: 'creator',
    specialty: 'Youth & Teen Fashion',
    experience_years: 4,
    bio: 'Young designer creating trendy and affordable fashion for teens and young adults. Always on top of the latest trends!',
    address: 'Studio 6, Creative District, Fashion City, FC 24685'
  }
];

async function seedData() {
  console.log('🌱 Starting Thread Theory Data Seeding...\n');
  
  try {
    let successCount = 0;
    let errorCount = 0;
    
    for (const userData of sampleUsers) {
      try {
        console.log(`👤 Creating ${userData.user_type}: ${userData.name}...`);
        const result = await userService.registerUser(userData);
        
        if (result.success) {
          console.log(`✅ Successfully created ${userData.name} (ID: ${result.user.id})`);
          successCount++;
        } else {
          console.log(`⚠️  Failed to create ${userData.name}: ${result.message}`);
          errorCount++;
        }
      } catch (error) {
        console.log(`❌ Error creating ${userData.name}: ${error.message}`);
        errorCount++;
      }
    }
    
    console.log('\n📊 Seeding Summary:');
    console.log(`✅ Successfully created: ${successCount} users`);
    console.log(`❌ Failed to create: ${errorCount} users`);
    console.log(`📝 Total attempted: ${sampleUsers.length} users`);
    
    if (successCount > 0) {
      console.log('\n🎉 Sample data seeded successfully!');
      console.log('\n👥 Test Accounts Created:');
      console.log('📧 Email: sarah.johnson@email.com | 🔑 Password: password123 (Customer)');
      console.log('📧 Email: isabella.martinez@email.com | 🔑 Password: password123 (Creator)');
      console.log('📧 Email: sophia.kim@email.com | 🔑 Password: password123 (Creator)');
      console.log('\n🔗 You can now test the login functionality with these accounts!');
    }
    
  } catch (error) {
    console.error('❌ Data seeding failed:', error.message);
    process.exit(1);
  } finally {
    await closeConnections();
  }
}

// Run the seeder
if (require.main === module) {
  seedData();
}

module.exports = { seedData, sampleUsers };
