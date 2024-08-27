export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({
      message: "Unauthorized: Please log in to access this resource.",
    });
  }
};
