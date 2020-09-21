const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({ filename: "errors.log", level: "error" }),
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});

if (process.env.NODE_ENV !== "production")
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        winston.format.simple()
      ),
    })
  );

module.exports = logger;
