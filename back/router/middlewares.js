const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Login required');
  }
  return next();
};

const isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(401).send('Already Logged in');
  }
  return next();
};

export { isLoggedIn, isNotLoggedIn };
