const jwt = require("jsonwebtoken");

 const tokenRefreshMiddleware = async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1]; // Assuming token is sent in the Authorization header
  console.log("accessToken",accessToken)
    if (!accessToken) {
      return res.status(401).json({ message: "Access token missing" });
    }
  
    try {
      const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = decodedToken; // Attach user info to request object
      next(); // Continue to the next middleware
    } catch (error) {
      console.log("errorerror", error.name)
      if (error.name === "TokenExpiredError") {
        const refreshToken = req.cookies.refreshToken;
          if (!refreshToken) {
          return res.status(401).json({ message: "Refresh token missing" });
        }
        try {
          const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
          const newAccessToken = jwt.sign({ userId: decodedRefreshToken.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "4m" });
          req.user = decodedRefreshToken; 
          res.setHeader("Authorization", `Bearer ${newAccessToken}`);
          next(); // Continue to the next middleware
        } catch (error) {
          return res.status(401).json({ message: "Refresh token expired or invalid" });
        }
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
  };
  
  module.exports = tokenRefreshMiddleware
  