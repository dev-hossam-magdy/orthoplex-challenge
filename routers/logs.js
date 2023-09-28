const router = require("express").Router();
const logsController = require("../controllers/logs");

router.all("*", logsController.log);

module.exports = router;