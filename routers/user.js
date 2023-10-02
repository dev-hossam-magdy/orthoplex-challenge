const router = require("express").Router();
const userController = require("../controllers/user");
const checkAuth = require("../middlewares/checkAuth");
const checkInt = require("../middlewares/checkInt");

router.post("/login", userController.login);
router.post("", userController.add);
router.put("/:userId", checkInt("userId"), userController.update);
router.get("", userController.add);
router.delete("/:userId", checkInt("userId"), userController.delete);

module.exports = router;
