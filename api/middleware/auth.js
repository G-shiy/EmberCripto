const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ erro: "No Token Provided " });

  const parts = authHeader.split(" ");

  if (!parts.length === 2) return res.status(401).json({ erro: "Token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$^/i.test(scheme))
    return res.status(401).json({ error: "Wrong Token Format" });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Invalid Token" });

    req.userEmail = decoded.email;
    return next();
  });
};
