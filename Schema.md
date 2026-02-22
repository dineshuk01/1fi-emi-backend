# Database Schema — 1Fi EMI App

## Database: MongoDB Atlas
## Database Name: `emiapp`

---

## Collections

### 1. `products`

Stores all products with their variants and EMI plans.

```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "slug": "String (required, unique)",
  "brand": "String (required)",
  "category": "String (required)",
  "description": "String",
  "variants": [
    {
      "_id": "ObjectId (auto)",
      "label": "String (required)",
      "color": "String",
      "storage": "String",
      "mrp": "Number (required)",
      "price": "Number (required)",
      "imageUrl": "String (required)",
      "emiPlans": [
        {
          "_id": "ObjectId (auto)",
          "monthlyAmount": "Number (required)",
          "tenure": "Number (required)",
          "interestRate": "Number (required)",
          "cashback": "Number (default: 0)"
        }
      ]
    }
  ],
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

---

### 2. `orders`

Stores all submitted orders after OTP verification.

```json
{
  "_id": "ObjectId",
  "orderId": "String (unique, auto-generated e.g. 1FI47291038)",
  "productId": "ObjectId (ref: Product, required)",
  "productName": "String (required)",
  "variantLabel": "String (required)",
  "variantPrice": "Number (required)",
  "emiPlan": {
    "monthlyAmount": "Number (required)",
    "tenure": "Number (required)",
    "interestRate": "Number (required)",
    "cashback": "Number (default: 0)"
  },
  "phone": "String (required)",
  "status": "String (enum: pending | under_review | approved | rejected, default: under_review)",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

---

### 3. `otps`

Temporarily stores OTPs for phone verification. Auto-deleted after 5 minutes.

```json
{
  "_id": "ObjectId",
  "phone": "String (required)",
  "otp": "String (required)",
  "expiresAt": "Date (TTL index — auto deleted after expiry)",
  "verified": "Boolean (default: false)"
}
```

---

## Relationships

```
products (1) ──────────── (many) orders
    │
    └── variants (embedded array)
            │
            └── emiPlans (embedded array)
```

- `orders.productId` references `products._id`
- `variants` and `emiPlans` are embedded subdocuments inside `products`
- `otps` is standalone — deleted after use

---

## Indexes

| Collection | Field | Type | Purpose |
|---|---|---|---|
| products | slug | Unique | Fast lookup by URL slug |
| orders | orderId | Unique | Fast lookup by order ID |
| otps | expiresAt | TTL | Auto-delete expired OTPs |