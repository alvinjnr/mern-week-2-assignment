const { ValidationError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || typeof name !== 'string') throw new ValidationError('Invalid or missing product name');
  if (!description || typeof description !== 'string') throw new ValidationError('Invalid or missing product description');
  if (typeof price !== 'number' || price < 0) throw new ValidationError('Invalid or missing product price');
  if (!category || typeof category !== 'string') throw new ValidationError('Invalid or missing product category');
  if (typeof inStock !== 'boolean') throw new ValidationError('Invalid or missing inStock value');
  next();
};
