export const validateQuery = (req, res, next) => {
  const { page, limit } = req.query;

  if (page && (isNaN(page) || page < 1)) {
    return res.status(400).json({ error: 'Invalid page number' });
  }

  if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
    return res.status(400).json({ error: 'Invalid limit (1-100)' });
  }

  next();
};
