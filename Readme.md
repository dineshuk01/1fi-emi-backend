# 1Fi EMI Product App

A full-stack web application where users can browse smartphones and purchase them via EMI plans backed by mutual funds — built as part of the 1Fi Full Stack Developer Assignment.

---

## 🔗 Live Demo

| | URL |
|---|---|
| **Frontend** | https://1fi-emi-frontend.vercel.app |
| **Backend API** | https://1fi-emi-backend.vercel.app |

---

## ✨ Features

- Browse smartphones with multiple variants (storage/color)
- View EMI plans — 0% and 10.5% interest options with cashback
- Variant switcher with live price and EMI update
- Proceed flow: Order Summary → Phone Entry → OTP Verify → Order Confirmation
- OTP stored in DB with 5 minute auto-expiry
- Order saved to database after OTP verification
- Unique URL per product (`/products/:slug`)
- Fully responsive — mobile and desktop
- Deployed on Vercel with MongoDB Atlas

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Deployment | Vercel (both frontend and backend) |

---

## 📁 Project Structure

```
1fi-emi-app/
├── backend/
│   ├── src/
│   │   ├── index.js                  # Express entry point
│   │   ├── config/
│   │   │   ├── db.js                 # MongoDB connection
│   │   │   └── seed.js               # Database seeder
│   │   ├── models/
│   │   │   ├── Product.js            # Product schema
│   │   │   ├── Order.js              # Order schema
│   │   │   └── Otp.js                # OTP schema
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   ├── orderController.js
│   │   │   └── otpController.js
│   │   └── routes/
│   │       ├── productRoutes.js
│   │       ├── orderRoutes.js
│   │       └── otpRoutes.js
│   ├── vercel.json
│   ├── SCHEMA.md
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── index.js
    │   ├── App.js
    │   ├── index.css
    │   ├── api/index.js
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── ProductCard.js
    │   │   ├── EmiPlanSelector.js
    │   │   ├── VariantSelector.js
    │   │   └── ProceedModal.js
    │   └── pages/
    │       ├── HomePage.js
    │       ├── ProductPage.js
    │       └── NotFoundPage.js
    ├── tailwind.config.js
    ├── .env.example
    └── package.json
```

---

## ⚙️ Setup & Run Instructions

### Prerequisites
- Node.js v18+ → https://nodejs.org
- MongoDB Atlas account (free) → https://www.mongodb.com/cloud/atlas

### 1. Clone the Repository
```bash
git clone https://github.com/YOURUSERNAME/1fi-emi-backend.git
git clone https://github.com/YOURUSERNAME/1fi-emi-frontend.git
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/emiapp?appName=Cluster0
NODE_ENV=development
```

```bash
npm run seed     # Seed database with 3 products
npm run dev      # Start server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm install -D tailwindcss autoprefixer postcss
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

```bash
npm start        # Start on http://localhost:3000
```

---

## 🌐 API Endpoints & Example Responses

### Products

#### `GET /api/products`
Returns all products

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "category": "Smartphones",
      "variants": [
        {
          "label": "256GB - Natural Titanium",
          "color": "Natural Titanium",
          "storage": "256GB",
          "mrp": 134900,
          "price": 127400,
          "imageUrl": "https://..."
        }
      ]
    }
  ]
}
```

#### `GET /api/products/:slug`
Returns full product with all variants and EMI plans

**Example:** `GET /api/products/iphone-17-pro`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "category": "Smartphones",
    "description": "Apple iPhone 17 Pro with A19 Pro chip...",
    "variants": [
      {
        "label": "256GB - Natural Titanium",
        "color": "Natural Titanium",
        "storage": "256GB",
        "mrp": 134900,
        "price": 127400,
        "imageUrl": "https://...",
        "emiPlans": [
          { "monthlyAmount": 44967, "tenure": 3,  "interestRate": 0,    "cashback": 7500 },
          { "monthlyAmount": 22483, "tenure": 6,  "interestRate": 0,    "cashback": 7500 },
          { "monthlyAmount": 11242, "tenure": 12, "interestRate": 0,    "cashback": 7500 },
          { "monthlyAmount": 5621,  "tenure": 24, "interestRate": 0,    "cashback": 7500 },
          { "monthlyAmount": 4297,  "tenure": 36, "interestRate": 10.5, "cashback": 7500 },
          { "monthlyAmount": 3385,  "tenure": 48, "interestRate": 10.5, "cashback": 7500 },
          { "monthlyAmount": 2842,  "tenure": 60, "interestRate": 10.5, "cashback": 7500 }
        ]
      }
    ]
  }
}
```

#### `GET /api/products/id/:id`
Returns product by MongoDB ObjectId

---

### Orders

#### `POST /api/orders`
Creates a new order

**Request Body:**
```json
{
  "productId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "productName": "iPhone 17 Pro",
  "variantLabel": "256GB - Natural Titanium",
  "variantPrice": 127400,
  "emiPlan": {
    "monthlyAmount": 44967,
    "tenure": 3,
    "interestRate": 0,
    "cashback": 7500
  },
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": "1FI47291038",
    "status": "under_review",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

#### `GET /api/orders`
Returns all orders

#### `GET /api/orders/:orderId`
Returns single order by order ID

**Example:** `GET /api/orders/1FI47291038`

---

### OTP

#### `POST /api/otp/send`
Generates and saves OTP (expires in 5 minutes)

**Request Body:**
```json
{ "phone": "9876543210" }
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "482910"
}
```
> `otp` field only visible in development mode. Hidden in production.

#### `POST /api/otp/verify`
Verifies OTP

**Request Body:**
```json
{ "phone": "9876543210", "otp": "482910" }
```

**Response (success):**
```json
{ "success": true, "message": "OTP verified successfully" }
```

**Response (failure):**
```json
{ "success": false, "message": "Invalid OTP" }
```

---

## 🗄️ Schema

See [SCHEMA.md](./backend/SCHEMA.md) for full schema documentation.

### Product Schema
```
Product
  ├── name          String (required)
  ├── slug          String (required, unique) — used in URL
  ├── brand         String (required)
  ├── category      String (required)
  ├── description   String
  └── variants[]    Array
        ├── label       String
        ├── color       String
        ├── storage     String
        ├── mrp         Number
        ├── price       Number
        ├── imageUrl    String
        └── emiPlans[]  Array
              ├── monthlyAmount   Number
              ├── tenure          Number (months)
              ├── interestRate    Number (0 or 10.5)
              └── cashback        Number (default 0)
```

### Order Schema
```
Order
  ├── orderId       String (auto-generated e.g. 1FI47291038)
  ├── productId     ObjectId (ref → Product)
  ├── productName   String
  ├── variantLabel  String
  ├── variantPrice  Number
  ├── emiPlan       Object { monthlyAmount, tenure, interestRate, cashback }
  ├── phone         String
  └── status        String (under_review | approved | rejected)
```

### OTP Schema
```
Otp
  ├── phone       String
  ├── otp         String
  ├── expiresAt   Date (TTL index — auto deleted after 5 min)
  └── verified    Boolean
```

---

## 📦 Seed Data

Run `npm run seed` to populate:

| Product | Variants | EMI Plans |
|---|---|---|
| iPhone 17 Pro | 3 (256GB, 512GB, 1TB) | 7 per variant |
| Samsung Galaxy S24 Ultra | 2 (256GB, 512GB) | 6 per variant |
| OnePlus 12 | 2 (256GB, 512GB) | 6 per variant |

---

## 🚀 Deployment (Vercel)

### Backend `vercel.json`
```json
{
  "version": 2,
  "builds": [{ "src": "src/index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "src/index.js" }]
}
```

### Vercel Environment Variables

**Backend:**
| Key | Value |
|---|---|
| `MONGODB_URI` | Your Atlas connection string |
| `NODE_ENV` | `production` |

**Frontend:**
| Key | Value |
|---|---|
| `REACT_APP_API_URL` | `https://your-backend.vercel.app/api` |

---

## 📋 Scripts

**Backend:**
```bash
npm run dev      # Development server with auto-reload
npm start        # Production server
npm run seed     # Seed database
```

**Frontend:**
```bash
npm start        # Development server
npm run build    # Production build
```