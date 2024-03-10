import jwt from 'jsonwebtoken';

const AuthMiddleware = {
  // Middleware to verify user token
  verifyToken: (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token provided' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user to request object
      req.user = decoded;
      console.log("User added to the request");
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Invalid Token' });
    }
  },

  // Middleware to check if the user is an admin
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return next();
    } else {
      res.status(403).json({ msg: "You are not an admin" });
    }
  },

  // Middleware to check if a user is logged in
  loginCheck: (req, res, next) => {
    // If user is already logged in, continue with the request
    if (req.session.loggedIn) {
      return next();
    } else {
      res.status(401).json({ msg: "Please log in first!" });
    }
  },
};

export default AuthMiddleware;
