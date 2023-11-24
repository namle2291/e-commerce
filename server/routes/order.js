const router = require("express").Router();
const orderController = require("../app/controllers/orderController");
// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");

router.put("/:oid/status", [verifyAccessToken], orderController.updateStatus);
router.post("/", [verifyAccessToken], orderController.create);

module.exports = router;
