const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false,
      });
    }

    
    if (!token.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid token format",
        success: false,
      });
    }


    const tokenValue = token.slice(7);

    JWT.verify(tokenValue, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: "Token verification failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
