const router = require("express").Router();
const user = require("../controllers/Users");
const { auth } = require("../middleware/auth");

router.post("/", user.auth);
router.post("/register", user.insert);
router.get("/me", auth, user.getMe);

module.exports = router;
