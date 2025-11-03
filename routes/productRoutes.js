const express = require('express');
const { v4: uuidv4 } = require('uuid');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError } = require('../utils/errors');
const router = express.Router();

let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Helper for async errors
const catchAsync = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/products (supports filtering by category, pagination, and search)
router.get('/', catchAsync(async (req, res) => {
  let { category, page = 1, limit = 10, search } = req.query;
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(product => product.category === category);
  }
  if (search) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  // Pagination
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + Number(limit));
  res.json({
    total: filtered.length,
    page: Number(page),
    limit: Number(limit),
    products: paginated
  });
}));

// GET /api/products/stats
router.get('/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST /api/products (with validation)
router.post('/', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id (with validation)
router.put('/:id', validateProduct, (req, res, next) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return next(new NotFoundError('Product not found'));
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

// DELETE /api/products/:id
router.delete('/:id', (req, res, next) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return next(new NotFoundError('Product not found'));
  const deleted = products.splice(idx, 1)[0];
  res.json({ message: 'Product deleted.', product: deleted });
});

module.exports = router;
