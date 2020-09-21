const logger = require("./logger");
const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

require("./startup/init")(app);

const server = app.listen(port, () =>
  console.log(`Server is listening to port ${port}`)
);

module.exports = server;
