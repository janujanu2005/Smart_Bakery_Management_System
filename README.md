```markdown
# 🍰 Smart Bakery Management System

A full-stack web application for managing bakery orders, inventory, and analytics.

## 🎯 Features

### User Features
- ✅ User Registration & Login with JWT Authentication
- ✅ Place Custom Cake Orders
- ✅ Upload Custom Cake Design Images
- ✅ Select Pickup Date & Time Slots
- ✅ Track Order Status in Real-Time
- ✅ Earn & View Reward Points
- ✅ Redeem Loyalty Points

### Admin Features
- ✅ Secure Admin Dashboard
- ✅ View All Orders & Update Status
- ✅ Manage Ingredients & Inventory
- ✅ Low Stock Alerts & Notifications
- ✅ Sales Analytics (Daily/Weekly/Monthly)
- ✅ View Customer Rewards & Leaderboard
- ✅ Most Sold Items Report

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (No Frameworks)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Architecture**: MVC (Model-View-Controller)
- **API**: RESTful APIs

## 📁 Project Structure

```
smart-bakery-management-system/
├── client/
│   ├── index.html              # Landing page
│   ├── login.html              # User/Admin login
│   ├── register.html           # User registration
│   ├── dashboard.html          # User dashboard
│   ├── order.html              # Place order page
│   ├── admin-dashboard.html    # Admin main dashboard
│   ├── manage-orders.html      # Admin order management
│   ├── inventory.html          # Admin inventory management
│   ├── analytics.html          # Admin sales analytics
│   ├── styles.css              # Global styles
│   ├── script.js               # Shared utilities
│   ├── auth.js                 # Authentication utilities
│   └── api.js                  # API service utilities
├── server/
│   ├── config/
│   │   ├── database.js         # PostgreSQL connection
│   │   └── multer.js           # File upload config
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   ├── orderController.js  # Order logic
│   │   ├── inventoryController.js # Inventory logic
│   │   └── rewardController.js # Rewards logic
│   ├── models/
│   │   ├── User.js             # User database model
│   │   ├── Order.js            # Order database model
│   │   ├── Ingredient.js       # Ingredient database model
│   │   └── Reward.js           # Reward database model
│   ├── middlewares/
│   │   ├── authMiddleware.js   # JWT verification
│   │   ├── adminMiddleware.js  # Admin role check
│   │   └── errorHandler.js     # Error handling
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── orderRoutes.js      # Order endpoints
│   │   ├── inventoryRoutes.js  # Inventory endpoints
│   │   └── rewardRoutes.js     # Reward endpoints
│   ├── uploads/                # Cake images storage
│   ├── server.js               # Express server entry point
│   └── package.json            # Node dependencies
├── database/
│   └── schema.sql              # PostgreSQL schema & sample data
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Project metadata
└── README.md                   # This file
```

## 🚀 Quick Start (5 Steps)

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/smart-bakery-management-system.git
cd smart-bakery-management-system
```

### Step 2: Install Dependencies
```bash
cd server
npm install
cd ..
```

### Step 3: Setup PostgreSQL Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE bakery_db;

# Exit psql
\q

# Run schema
psql -U postgres -d bakery_db -f database/schema.sql
```

### Step 4: Configure .env File
Create `.env` file in project root:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bakery_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_super_secret_jwt_key_12345
NODE_ENV=development
PORT=3000
```

### Step 5: Start Backend & Frontend

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Start Frontend:**
Open `client/index.html` with VS Code Live Server (Right-click → "Open with Live Server")

Or use Python:
```bash
cd client
python -m http.server 8000
# Visit http://localhost:8000
```

## 🔑 Test Accounts

| Role  | Email               | Password    |
|-------|-------------------|-------------|
| Admin | admin@bakery.com  | password123 |
| User  | john@example.com  | password123 |
| User  | jane@example.com  | password123 |

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/me             - Get current user
```

### Orders
```
POST   /api/orders              - Create order
GET    /api/orders              - Get user orders
GET    /api/orders/:id          - Get order details
GET    /api/orders/admin/all    - Get all orders (admin)
PUT    /api/orders/:id/status   - Update order status (admin)
```

### Inventory
```
GET    /api/inventory           - Get all ingredients
POST   /api/inventory           - Add ingredient (admin)
PUT    /api/inventory/:id       - Update ingredient (admin)
GET    /api/inventory/low-stock - Get low stock items (admin)
```

### Dashboard
```
GET    /api/dashboard/stats     - Get statistics (admin)
GET    /api/dashboard/analytics - Get sales analytics (admin)
```

### Rewards
```
GET    /api/rewards             - Get user rewards
POST   /api/rewards/redeem      - Redeem points
GET    /api/rewards/admin/all   - Get all rewards (admin)
GET    /api/rewards/admin/top-users - Get top users (admin)
```

## 🔐 Security Features

- ✅ JWT Authentication
- ✅ Password Hashing (bcryptjs)
- ✅ Admin Role Protection
- ✅ CORS Enabled
- ✅ Input Validation
- ✅ File Upload Security (Multer)
- ✅ Error Handling Middleware
- ✅ SQL Injection Prevention

## 🎨 Frontend Pages

### User Pages
| Page | URL | Purpose |
|------|-----|---------|
| Landing | `/index.html` | Homepage |
| Register | `/register.html` | Sign up |
| Login | `/login.html` | Sign in |
| Dashboard | `/dashboard.html` | View orders & rewards |
| Place Order | `/order.html` | Create cake order |

### Admin Pages
| Page | URL | Purpose |
|------|-----|---------|
| Admin Dashboard | `/admin-dashboard.html` | Statistics & overview |
| Manage Orders | `/manage-orders.html` | Update order status |
| Inventory | `/inventory.html` | Add/manage ingredients |
| Analytics | `/analytics.html` | Sales reports |

## 🚨 Troubleshooting

### "Cannot find module 'pg'"
```bash
cd server
npm install
```

### "Error: connect ECONNREFUSED 127.0.0.1:5432"
- PostgreSQL is not running
- Start PostgreSQL service
- Verify database name and credentials in `.env`

### "CORS error in browser"
- Backend server is not running (`npm start` in server folder)
- Check API URL in `client/api.js`

### "JWT token is invalid"
- Token expired (login again)
- JWT_SECRET changed (ensure consistency in `.env`)

### "File upload fails"
- Check `server/uploads/` directory exists
- Verify file size < 5MB
- Check file type is image (JPG/PNG/GIF/WebP)

### Database connection fails
```bash
# Test PostgreSQL
psql -U postgres -h localhost

# Check if database exists
psql -U postgres -l | grep bakery_db

# Recreate database
psql -U postgres -d bakery_db -f database/schema.sql
```

## 💻 Testing API with cURL

```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"Pass123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"Pass123"}'

# Create order (replace TOKEN)
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"cake_name":"Chocolate","weight":2.5,"message":"Happy","pickup_time":"2026-04-10T14:00:00"}'
```

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Guide](https://jwt.io/introduction)
- [Multer Upload](https://github.com/expressjs/multer)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [REST API Best Practices](https://restfulapi.net/)

## 🚀 Deployment

### Deploy to Heroku
```bash
npm install -g heroku
heroku login
heroku create your-bakery-app
heroku config:set JWT_SECRET=your_secret
heroku config:set DB_HOST=your_db_host
git push heroku main
```

### Deploy with Docker
```bash
docker build -t smart-bakery .
docker run -p 3000:3000 smart-bakery
```

## ❓ FAQ

**Q: Can I change the pricing?**
A: Yes, modify `orderController.js` (currently $10/kg)

**Q: How do I backup the database?**
A: `pg_dump bakery_db > backup.sql`

**Q: How do I add more admin accounts?**
A: Insert into users table with `role = 'admin'`

**Q: Does this work on Windows?**
A: Yes, all code is cross-platform compatible

**Q: Can I use this on mobile?**
A: Yes, responsive design works on all devices

## 📄 License

MIT License - Free for personal and commercial use

## 👥 Author

Smart Bakery Management System
- Full-stack development project demonstrating best practices

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

**Made with ❤️ by Janujan8017**

**Happy Baking! 🍰**
