const router = require("express").Router();

router.get("/", require("../controllers/api").get);
router.use("/courses", require("../routes/Courses"));
router.use("/auth", require("./auth"));
module.exports = router;
