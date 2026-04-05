export const adminOnly = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
  next();
};

export const adminOrUser = (req, res, next) => {
  if (!["admin", "user"].includes(req.userRole)) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
  next();
};

export const userOnly = (req, res, next) => {
  if (req.userRole !== "user") {
    return res.status(403).json({
      success: false,
      message: "User access only",
    });
  }
  next();
};
