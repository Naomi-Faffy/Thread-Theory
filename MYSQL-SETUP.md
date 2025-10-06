# Thread Theory - MySQL Database Setup

This guide will help you set up MySQL database for your Thread Theory application's customer and creator sign-up system.

## 🚀 Quick Start

### 1. Prerequisites

- **MySQL Server** installed and running
- **Node.js** and **npm** installed
- **Git** (if cloning the repository)

### 2. Install MySQL Server

#### Windows:
1. Download MySQL Installer from [mysql.com](https://dev.mysql.com/downloads/installer/)
2. Run the installer and choose "Developer Default"
3. Set a root password (remember this!)
4. Complete the installation

#### macOS:
```bash
# Using Homebrew
brew install mysql
brew services start mysql

# Set root password
mysql_secure_installation
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### 3. Configure Environment Variables

Update your `.env` file with your MySQL credentials:

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=threadtheory

# JWT Secret for authentication
JWT_SECRET=your_secure_jwt_secret_here
```

**Important:** Replace `your_mysql_password_here` with your actual MySQL root password!

### 4. Initialize Database

Run the setup script to create the database and tables:

```bash
npm run db:setup
```

### 5. Add Sample Data (Optional)

Populate the database with sample users for testing:

```bash
npm run db:seed
```

### 6. Start the API Server

```bash
npm run api:start
```

## 📊 Database Schema

The setup creates the following tables:

### `users` - Main user table for customers and creators
- `id` (Primary Key)
- `name` (User's full name)
- `email` (Unique email address)
- `phone` (Phone number)
- `password_hash` (Encrypted password)
- `user_type` (ENUM: 'customer', 'creator')
- `specialty` (For creators - their specialization)
- `experience_years` (For creators - years of experience)
- `bio` (User biography)
- `address` (User address)
- `is_active` (Account status)
- `created_at`, `updated_at` (Timestamps)

### `customers` - Legacy compatibility table
- `id` (Primary Key)
- `Custname`, `Custemail`, `Custnumber`
- `user_id` (Foreign key to users table)

### `user_sessions` - Authentication sessions
- Session management for JWT tokens

### `cart` - Shopping cart items
- User shopping cart functionality

### `votes` - User votes on collections
- Voting system for fashion collections

### `orders` - Order management
- Order tracking and management

## 🔗 API Endpoints

### Authentication
- `POST /api/register` - Register new user (customer/creator)
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Customers (Legacy compatibility)
- `GET /api/customers` - Get customers list
- `POST /api/customers` - Create customer
- `POST /api/accounts` - Legacy account creation

### Health Check
- `GET /health` - Database connection status

## 🧪 Testing the Setup

### 1. Health Check
```bash
curl http://localhost:3001/health
```

### 2. Register a New User
```bash
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "user_type": "customer",
    "phone": "+1234567890"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 🔧 Troubleshooting

### Common Issues

#### 1. "Access denied for user 'root'"
- Check your MySQL password in `.env`
- Ensure MySQL server is running
- Try connecting manually: `mysql -u root -p`

#### 2. "Connection refused"
- MySQL server is not running
- Start MySQL service:
  - Windows: Services → MySQL → Start
  - macOS: `brew services start mysql`
  - Linux: `sudo systemctl start mysql`

#### 3. "Database does not exist"
- The setup script will create the database automatically
- Ensure your MySQL user has CREATE privileges

#### 4. "Table already exists"
- Tables are created with `IF NOT EXISTS`
- This is normal if running setup multiple times

### Reset Database
To completely reset the database:

```sql
-- Connect to MySQL
mysql -u root -p

-- Drop and recreate database
DROP DATABASE IF EXISTS threadtheory;
CREATE DATABASE threadtheory;

-- Exit MySQL
exit;

-- Run setup again
npm run db:setup
```

## 📝 Sample Test Accounts

After running `npm run db:seed`, you can test with these accounts:

**Customers:**
- Email: `sarah.johnson@email.com` | Password: `password123`
- Email: `michael.chen@email.com` | Password: `password123`

**Creators:**
- Email: `isabella.martinez@email.com` | Password: `password123`
- Email: `sophia.kim@email.com` | Password: `password123`

## 🔄 Migration from MongoDB

Your existing MongoDB data can be migrated. The new system:
- ✅ Maintains backward compatibility with existing API endpoints
- ✅ Adds proper authentication with JWT tokens
- ✅ Supports both customers and creators
- ✅ Includes password hashing for security
- ✅ Provides session management

## 📚 Next Steps

1. Update your frontend to use the new authentication endpoints
2. Implement proper error handling in your UI
3. Add password reset functionality
4. Set up proper JWT token refresh
5. Configure production database settings

## 🛡️ Security Notes

- Passwords are hashed using bcryptjs
- JWT tokens are used for authentication
- Sessions are tracked in the database
- Input validation is implemented
- SQL injection protection via parameterized queries
