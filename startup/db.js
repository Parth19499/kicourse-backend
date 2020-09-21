const mongoose = require("mongoose");
const logger = require("../logger");
const config = require("config");

module.exports = () => {
  const url = config.get("app.db-url");
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  mongoose.connection
    .on("connected", () => logger.info(`DB Connection Established to ${url}`))
    .on("error", (err) => logger.error(err.messsage, err))
    .on("disconnected", () => logger.info("Connection Closed"));
};
