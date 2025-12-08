export const adminAuthMiddleware = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'You must be logged in to perform this action' });
    }
    
    if (req.session.user.role !== 'admin') {
      return res.status(403).json({ error: 'You must be an admin to perform this action' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

