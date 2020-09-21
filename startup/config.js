const config = require("config");

module.exports = () => {
  if (!config.get("app.jwtPrivateKey"))
    throw new Error("FATAL Exception: Couldn't get jwtPrivateKey");
  return config.get("app.port") ? config.get("app.port") : 3001;
};
