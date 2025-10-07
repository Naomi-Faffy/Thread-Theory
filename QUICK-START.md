# Thread Theory - Quick Start Guide

## 🚀 Get Your Database Running in 3 Steps

### Step 1: Make sure MySQL is running
- **Windows**: Check Services → MySQL → Running
- **Mac**: `brew services start mysql`
- **Linux**: `sudo systemctl start mysql`

### Step 2: Run the complete setup
```bash
npm run setup
```

This single command will:
- ✅ Test your MySQL connection
- ✅ Create the `threadtheory` database
- ✅ Create all 9 tables with proper indexes
- ✅ Add sample customers and creators
- ✅ Test authentication system
- ✅ Verify everything works

### Step 3: Start your API server
```bash
npm start
```

## 🎯 That's it! Your database is ready!

### Test it works:
1. **Health Check**: http://localhost:3001/health
2. **Login Test**: Use `sarah.johnson@threadtheory.com` / `password123`

---

## 📊 What Gets Created

### Database Tables:
- **`users`** - Main table for customers & creators
- **`customers`** - Legacy compatibility 
- **`user_sessions`** - Authentication tokens
- **`cart`** - Shopping cart items
- **`votes`** - Collection voting
- **`orders`** - Order management
- **`order_items`** - Individual order items
- **`creator_profiles`** - Extended creator info
- **`notifications`** - User notifications

### Sample Accounts:
**Customers:**
- sarah.johnson@threadtheory.com / password123
- michael.chen@threadtheory.com / password123
- emily.rodriguez@threadtheory.com / password123

**Creators:**
- isabella.martinez@threadtheory.com / password123
- sophia.kim@threadtheory.com / password123
- ava.thompson@threadtheory.com / password123

---

## 🔧 If Something Goes Wrong

### "Access denied" error:
- Check your password is `tafara10` in `.env`
- Make sure MySQL user `root` exists

### "Connection refused" error:
- Start MySQL server (see Step 1 above)

### "Database already exists" warning:
- This is normal - the script will use existing database

### Reset everything:
```bash
# In MySQL command line:
DROP DATABASE threadtheory;

# Then run setup again:
npm run setup
```

---

## 🔗 API Endpoints Ready to Use

### Authentication:
- `POST /api/register` - Sign up new users
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Legacy Support:
- `GET /api/customers` - List customers
- `POST /api/customers` - Add customer
- `POST /api/accounts` - Legacy account creation

### Health:
- `GET /health` - Check database connection

---

## 🎉 Your Thread Theory database is now fully functional!

The system supports:
- ✅ Customer and Creator sign-ups
- ✅ Secure password hashing
- ✅ JWT token authentication
- ✅ Session management
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Collection voting
- ✅ Creator profiles
- ✅ Notifications
- ✅ Full backward compatibility

**Ready to handle all your fashion platform needs!** 🌟
