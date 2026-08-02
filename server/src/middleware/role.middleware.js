// ======================================
// Super Admin Only
// ======================================
export const isSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "super_admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Super Admin only.",
    });
  }

  next();
};

// ======================================
// Manager or Super Admin
// ======================================
export const isManager = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (
    req.user.role !== "manager" &&
    req.user.role !== "super_admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "Access denied.",
    });
  }

  next();
};

// ======================================
// Customer Only
// ======================================
export const isCustomer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "customer") {
    return res.status(403).json({
      success: false,
      message: "Customer only.",
    });
  }

  next();
};

// ======================================
// Dynamic Role Middleware
// Example:
// hasRole("super_admin")
// hasRole("super_admin","manager")
// ======================================
export const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Permission denied.",
      });
    }

    next();
  };
};