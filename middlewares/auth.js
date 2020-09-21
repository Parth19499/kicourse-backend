const jwt = require("jsonwebtoken");
const config = require("config");
const logger = require("../logger");

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied! No token provided.");
  try {
    // winston.info(`token: ${token}`);
    const decoded = jwt.verify(token, config.get("app.jwtPrivateKey"));
    let j = JSON.stringify(decoded);
    // winston.info(`decoded: ${j}`);
    req.user = decoded;
    next();
  } catch (ex) {
    logger.error(ex.message, ex);
    res.status(400).send("Invalid token!");
  }
};
