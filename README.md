# mern-week-2-assignment
# MERN Week 2 Assignment – Express.js REST API

## 🚀 Objective

A RESTful API using Express.js implementing standard CRUD operations, middleware, proper error handling, filtering, pagination, and advanced features for a `products` resource.

## 🛠️ Requirements

- Node.js 16+ and npm

## 📦 Setup

```bash
git clone https://github.com/<your-username>/mern-week-2-assignment.git
cd mern-week-2-assignment
npm install
```

## ▶️ Run

```bash
npm run start
# or for development (auto-restart)
npm run dev
```

## 🧪 API Usage

**Authentication:**  
All requests (except `GET /`) require an HTTP header:  
`X-API-Key: secret123`

### Routes

- `GET /` — Hello World
- `GET /api/products` — List products  
  Query: `?category=electronics&search=lap&page=1&limit=10`
- `GET /api/products/:id` — Single product
- `POST /api/products` — Create product  
  JSON: `{ name, description, price, category, inStock }`
- `PUT /api/products/:id` — Update product  
  JSON: `{ name, description, price, category, inStock }`
- `DELETE /api/products/:id` — Delete product
- `GET /api/products/stats` — Category count

### Validation

- All POST/PUT data must include **all fields**:  
  `name` (string), `description` (string), `price` (number), `category` (string), `inStock` (boolean)

---

**Advanced features:**

- Filtering (`?category=...`)
- Search (`?search=...`)
- Pagination (`?page=...&limit=...`)
- Stats (`/api/products/stats`)

---

> _Starter code is in-memory only. Integrate a database for persistent storage as an exercise!_

