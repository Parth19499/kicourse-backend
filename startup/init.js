const config = require("config");
const logger = require("../logger");

module.exports = (app) => {
  logger.info(`Running: ${config.get("app.name")}`);
  const port = require("./config")();
  require("./db")();
  require("./middlewares")(app);
  //   return port;
};
