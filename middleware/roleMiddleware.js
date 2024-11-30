export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden: Admin only' });
    }
    next();
  };
  
  export const isSubAdmin = (req, res, next) => {
    if (req.user.role !== 'sub-admin') {
      return res.status(403).json({ message: 'Access forbidden: Sub-admin only' });
    }
    next();
  };
  