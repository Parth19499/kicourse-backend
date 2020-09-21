const router = require("express").Router();
const user = require("../controllers/auth");
const { auth } = require("../middlewares/auth");

router.post("/", user.auth);
router.post("/register", user.insert);
router.get("/me", auth, user.getMe);

module.exports = router;
