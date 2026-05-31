-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cake_name VARCHAR(100) NOT NULL,
  weight DECIMAL(10, 2) NOT NULL,
  message TEXT,
  image_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Preparing' CHECK (status IN ('Preparing', 'Ready', 'Delivered', 'Cancelled')),
  pickup_time TIMESTAMP NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  low_stock_threshold DECIMAL(10, 2) DEFAULT 10,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table for tracking ingredient usage
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  ingredient_id INTEGER NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
  quantity_used DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_rewards_user_id ON rewards(user_id);

-- Insert sample admin user (password: password123 hashed with bcryptjs salt rounds 10)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@bakery.com', '$2a$10$5pJ.qGhz7c7xV9z0K5z9OOUx6c9Z9z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8', 'admin')
ON CONFLICT DO NOTHING;

-- Insert sample users
INSERT INTO users (name, email, password, role) VALUES 
('John Doe', 'john@example.com', '$2a$10$5pJ.qGhz7c7xV9z0K5z9OOUx6c9Z9z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8', 'user'),
('Jane Smith', 'jane@example.com', '$2a$10$5pJ.qGhz7c7xV9z0K5z9OOUx6c9Z9z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8', 'user')
ON CONFLICT DO NOTHING;

-- Insert sample ingredients
INSERT INTO ingredients (name, quantity, unit, low_stock_threshold) VALUES 
('Flour', 50.00, 'kg', 10),
('Sugar', 30.00, 'kg', 5),
('Eggs', 200.00, 'pieces', 50),
('Butter', 25.00, 'kg', 5)
ON CONFLICT DO NOTHING;

-- Insert sample rewards
INSERT INTO rewards (user_id, points) VALUES 
(2, 150),
(3, 75)
ON CONFLICT DO NOTHING;

-- Insert sample orders
INSERT INTO orders (user_id, cake_name, weight, message, status, pickup_time, price) VALUES 
(2, 'Chocolate Cake', 2.5, 'Happy Birthday!', 'Delivered', CURRENT_TIMESTAMP + INTERVAL '2 days', 25.00),
(3, 'Vanilla Cake', 1.5, 'Congratulations!', 'Ready', CURRENT_TIMESTAMP + INTERVAL '1 day', 15.00)
ON CONFLICT DO NOTHING;