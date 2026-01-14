const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user is already set by authMiddleware
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

export default authorizeRoles;