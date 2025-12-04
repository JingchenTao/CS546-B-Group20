// Admin authentication middleware
// Verifies that the user is authenticated and has admin role

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'You must be logged in to perform this action' });
    }
    
    // Check if user has admin role
    if (req.session.user.role !== 'admin') {
      return res.status(403).json({ error: 'You must be an admin to perform this action' });
    }
    
    // User is authenticated and is an admin, proceed
    next();
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

