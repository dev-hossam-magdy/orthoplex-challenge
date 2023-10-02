const router = require("express").Router();
const userController = require("../controllers/user");
const checkAuth = require("../middlewares/checkAuth");
const checkInt = require("../middlewares/checkInt");
const paramName = "userId";

router.post("/login", userController.login);
router.post("", checkAuth, userController.add);
router.put(
  `/:${paramName}`,
  checkInt(paramName),
  checkAuth,
  userController.update
);
router.get("", userController.getAll);
router.get(`/:${paramName}`, checkInt(paramName), userController.getOne);
router.delete(
  `/:${paramName}`,
  checkInt(paramName),
  checkAuth,
  userController.delete
);

module.exports = router;
