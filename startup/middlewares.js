const express = require("express");
const helmet = require("helmet");
// const cors = require("cors");
const compression = require("compression");
const favicon = require("serve-favicon");
const { error } = require("../middlewares/error");

module.exports = (app) => {
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  // app.use(cors());
  app.use(favicon("./images/nodeappicon.ico"));
  //   app.set("view engine", "pug");
  require("./routes")(app);
  app.use(error);
};
