const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  GenerateToken(args) {
    const token = jwt.sign({ args }, process.env.SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });
    return token;
  },

  GenerateRefreshToken(args = {}) {
    const refreshToken = jwt.sign({ args }, process.env.REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });
    return refreshToken;
  },
};
