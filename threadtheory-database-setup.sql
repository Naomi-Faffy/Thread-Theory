-- =====================================================
-- Thread Theory MySQL Database Setup
-- Complete database schema for customers and creators
-- =====================================================

-- Drop database if exists and recreate
DROP DATABASE IF EXISTS threadtheory;
CREATE DATABASE threadtheory;
USE threadtheory;

-- =====================================================
-- USERS TABLE - Main table for customers and creators
-- =====================================================
CREATE TABLE users (
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

    -- Indexes for performance
    INDEX idx_email (email),
    INDEX idx_user_type (user_type),
    INDEX idx_created_at (created_at),
    INDEX idx_is_active (is_active)
);

-- =====================================================
-- CUSTOMERS TABLE - Legacy compatibility
-- =====================================================
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Custname VARCHAR(255) NOT NULL,
    Custemail VARCHAR(255),
    Custnumber VARCHAR(20),
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign key relationship
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,

    -- Indexes
    INDEX idx_email (Custemail),
    INDEX idx_created_at (created_at),
    INDEX idx_user_id (user_id)
);

-- =====================================================
-- CREATORS TABLE - Creator profiles for the platform
-- =====================================================
CREATE TABLE creators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    experience INT DEFAULT 0,
    bio TEXT,
    phone VARCHAR(20),
    contact_preference ENUM('whatsapp', 'phone', 'email') DEFAULT 'whatsapp',
    address TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes
    INDEX idx_email (email),
    INDEX idx_specialty (specialty),
    INDEX idx_is_available (is_available),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- USER SESSIONS TABLE - Authentication management
-- =====================================================
CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Foreign key relationship
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    -- Indexes
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);

-- =====================================================
-- CART TABLE - Shopping cart functionality
-- =====================================================
CREATE TABLE cart (
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

    -- Foreign key relationship
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_product_id (product_id),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- VOTES TABLE - Collection voting system
-- =====================================================
CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    collection_id VARCHAR(255) NOT NULL,
    collection_name VARCHAR(255),
    vote_type ENUM('like', 'dislike') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Foreign key relationship
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    -- Unique constraint - one vote per user per collection
    UNIQUE KEY unique_user_collection (user_id, collection_id),

    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_collection_id (collection_id),
    INDEX idx_vote_type (vote_type),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- ORDERS TABLE - Order management
-- =====================================================
CREATE TABLE orders (
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

    -- Foreign key relationship
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_order_number (order_number),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- ORDER ITEMS TABLE - Individual items in orders
-- =====================================================
CREATE TABLE order_items (
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

    -- Foreign key relationship
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,

    -- Indexes
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
);

-- =====================================================
-- CREATOR PROFILES TABLE - Extended creator information
-- =====================================================
CREATE TABLE creator_profiles (
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

    -- Foreign key relationship
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    -- Unique constraint
    UNIQUE KEY unique_user_profile (user_id),

    -- Indexes
    INDEX idx_availability_status (availability_status),
    INDEX idx_hourly_rate (hourly_rate)
);

-- =====================================================
-- NOTIFICATIONS TABLE - User notifications
-- =====================================================
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Foreign key relationship
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert sample customers
INSERT INTO users (name, email, phone, password_hash, user_type, address) VALUES
('Sarah Johnson', 'sarah.johnson@email.com', '+1234567890', '$2a$10$example.hash.for.password123', 'customer', '123 Fashion Street, Style City, SC 12345'),
('Michael Chen', 'michael.chen@email.com', '+1234567891', '$2a$10$example.hash.for.password123', 'customer', '456 Trend Avenue, Fashion Town, FT 67890'),
('Emily Rodriguez', 'emily.rodriguez@email.com', '+1234567892', '$2a$10$example.hash.for.password123', 'customer', '789 Style Boulevard, Design City, DC 13579');

-- Insert sample creators
INSERT INTO users (name, email, phone, password_hash, user_type, specialty, experience_years, bio, address) VALUES
('Isabella Martinez', 'isabella.martinez@email.com', '+1234567893', '$2a$10$example.hash.for.password123', 'creator', 'Dresses & Evening Wear', 8, 'Passionate designer specializing in elegant evening wear and custom dresses. I love creating pieces that make women feel confident and beautiful.', 'Studio 1, Creative District, Fashion City, FC 24680'),
('Sophia Kim', 'sophia.kim@email.com', '+1234567894', '$2a$10$example.hash.for.password123', 'creator', 'Casual & Streetwear', 5, 'Urban fashion enthusiast creating comfortable yet stylish casual wear. I designs blend street culture with contemporary fashion.', 'Studio 2, Creative District, Fashion City, FC 24681'),
('Ava Thompson', 'ava.thompson@email.com', '+1234567895', '$2a$10$example.hash.for.password123', 'creator', 'Accessories & Jewelry', 12, 'Artisan jewelry maker and accessories designer. I create unique pieces that add the perfect finishing touch to any outfit.', 'Studio 3, Creative District, Fashion City, FC 24682');

-- Insert corresponding customer records for backward compatibility
INSERT INTO customers (Custname, Custemail, Custnumber, user_id)
SELECT name, email, phone, id FROM users WHERE user_type = 'customer';

-- Insert sample creators into creators table
INSERT INTO creators (name, email, specialty, experience, bio, phone, contact_preference, address, is_available) VALUES
('Isabella Martinez', 'isabella.martinez@email.com', 'Dresses & Evening Wear', 8, 'Passionate designer specializing in elegant evening wear and custom dresses. I love creating pieces that make women feel confident and beautiful.', '+1234567893', 'whatsapp', 'Studio 1, Creative District, Fashion City, FC 24680', TRUE),
('Sophia Kim', 'sophia.kim@email.com', 'Casual & Streetwear', 5, 'Urban fashion enthusiast creating comfortable yet stylish casual wear. My designs blend street culture with contemporary fashion.', '+1234567894', 'whatsapp', 'Studio 2, Creative District, Fashion City, FC 24681', TRUE),
('Ava Thompson', 'ava.thompson@email.com', 'Accessories & Jewelry', 12, 'Artisan jewelry maker and accessories designer. I create unique pieces that add the perfect finishing touch to any outfit.', '+1234567895', 'whatsapp', 'Studio 3, Creative District, Fashion City, FC 24682', TRUE);

-- =====================================================
-- USEFUL VIEWS FOR REPORTING
-- =====================================================

-- View for customer summary
CREATE OR REPLACE VIEW customer_summary AS
SELECT
    u.id,
    u.name,
    u.email,
    u.phone,
    u.address,
    u.created_at,
    COUNT(DISTINCT o.id) as total_orders,
    COALESCE(SUM(o.total_amount), 0) as total_spent,
    COUNT(DISTINCT v.id) as total_votes
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN votes v ON u.id = v.user_id
WHERE u.user_type = 'customer' AND u.is_active = TRUE
GROUP BY u.id, u.name, u.email, u.phone, u.address, u.created_at;

-- View for creator summary
CREATE OR REPLACE VIEW creator_summary AS
SELECT
    u.id,
    u.name,
    u.email,
    u.phone,
    u.specialty,
    u.experience_years,
    u.bio,
    u.created_at,
    cp.availability_status,
    cp.hourly_rate,
    cp.commission_rate
FROM users u
LEFT JOIN creator_profiles cp ON u.id = cp.user_id
WHERE u.user_type = 'creator' AND u.is_active = TRUE;

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

DELIMITER //

-- Procedure to get user statistics
CREATE PROCEDURE GetUserStats()
BEGIN
    SELECT
        'Total Users' as metric,
        COUNT(*) as value
    FROM users WHERE is_active = TRUE

    UNION ALL

    SELECT
        'Total Customers' as metric,
        COUNT(*) as value
    FROM users WHERE user_type = 'customer' AND is_active = TRUE

    UNION ALL

    SELECT
        'Total Creators' as metric,
        COUNT(*) as value
    FROM users WHERE user_type = 'creator' AND is_active = TRUE

    UNION ALL

    SELECT
        'Total Orders' as metric,
        COUNT(*) as value
    FROM orders

    UNION ALL

    SELECT
        'Total Revenue' as metric,
        COALESCE(SUM(total_amount), 0) as value
    FROM orders WHERE status = 'delivered';
END //

DELIMITER ;

-- =====================================================
-- TRIGGERS FOR DATA INTEGRITY
-- =====================================================

DELIMITER //

-- Trigger to automatically create customer record when user is created
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.user_type = 'customer' THEN
        INSERT INTO customers (Custname, Custemail, Custnumber, user_id)
        VALUES (NEW.name, NEW.email, NEW.phone, NEW.id);
    END IF;
END //

-- Trigger to update order total when order items change
CREATE TRIGGER after_order_item_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(total_price)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE id = NEW.order_id;
END //

DELIMITER ;

-- =====================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- =====================================================

-- Additional composite indexes for common queries
CREATE INDEX idx_users_type_active ON users(user_type, is_active);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_cart_user_product ON cart(user_id, product_id);
CREATE INDEX idx_votes_collection_type ON votes(collection_id, vote_type);

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

SELECT 'Thread Theory Database Setup Complete!' as message,
       'Database: threadtheory' as database_name,
       'Tables Created: 10' as tables_count,
       'Views Created: 2' as views_count,
       'Procedures Created: 1' as procedures_count,
       'Sample Data Inserted: Yes' as sample_data,
       'Ready for use!' as status;
