# CHRONOS — Luxury Watches MERN Stack

## Stack
- **Frontend**: React + Vite + Tailwind CSS + React Router v6
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose

## Quick Start

### 1. Install Dependencies
```bash
# Install server deps
cd server && npm install

# Install client deps
cd ../client && npm install
```

### 2. Configure Environment
```bash
# Copy and edit the env file
cp server/.env.example server/.env
# Edit MONGO_URI, JWT_SECRET, PORT as needed
```

### 3. Seed the Database
```bash
cd server && npm run seed
# Creates 3 watches + admin user: admin@chronos.com / admin123
```

### 4. Run Dev Servers
```bash
# Terminal 1 — Backend (http://localhost:5000)
cd server && npm run dev

# Terminal 2 — Frontend (http://localhost:5173)
cd client && npm run dev
```

## Routes
| Path | Description |
|------|-------------|
| `/` | Home — Hero, featured watches, brand story |
| `/shop` | Full collection with filters & sort |
| `/product/:id` | Product detail with specs & cart |
| `/cart` | Cart + checkout flow |
| `/admin` | Dashboard (revenue, orders, products) |
| `/admin/products` | CRUD for watches |
| `/admin/orders` | Order management with status updates |
| `/admin/customers` | Customer overview with spend tiers |

## Image Fix
Images are stored in `client/public/images/` and served as static assets.
The path format used is `/images/filename.jpg` — no spaces, all lowercase.

Original images copied & renamed:
- `Field Commander.jpg` → `/images/field-commander.jpg`
- `Filwd.jpg` → `/images/filwd.jpg`
- `Tourbillon Noir.jpg` → `/images/tourbillon-noir.jpg`

## API Endpoints
```
GET    /api/products           — All products
GET    /api/products/:id       — Single product
POST   /api/products           — Create product
PUT    /api/products/:id       — Update product
DELETE /api/products/:id       — Delete product

GET    /api/orders             — All orders
GET    /api/orders/:id         — Single order
POST   /api/orders             — Place order
PUT    /api/orders/:id         — Update order status

POST   /api/auth/login         — Login
POST   /api/auth/register      — Register
```
