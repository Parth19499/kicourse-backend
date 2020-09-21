const router = require("express").Router();
const course = require("../controllers/Course");
const { auth } = require("../middlewares/auth");
const { validateObjectId } = require("../middlewares/validateObjectId");

router.get("/", course.get);
router.get("/:id", validateObjectId, course.getById);
router.post("/insert", /* auth, */ course.insert);
router.put("/update/:id", /* [auth, validateObjectId], */ course.update);
router.delete("/delete/:id", /* [auth, validateObjectId], */ course.delete);

module.exports = router;
