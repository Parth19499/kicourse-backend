const api = require("../routes/api");

module.exports = (app) => {
  app.get("/", (req, res) =>
    // res.render("index", {
    //   title: "NodeJS Server",
    //   heading: "MongoDB Express NodeJs",
    // })
    res.send("KiCourse Server")
  );
  app.use("/api", api);
};
