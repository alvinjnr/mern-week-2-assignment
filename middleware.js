module.exports = (req, res, next) => {
  if (req.method === 'GET' && req.url === '/') return next();
  const apiKey = req.header('X-API-Key');
  if (!apiKey || apiKey !== 'secret123') {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid API Key.' });
  }
  next();
};
