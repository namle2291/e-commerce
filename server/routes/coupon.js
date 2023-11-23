const router = require("express").Router();
const couponController = require("../app/controllers/couponController");
// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");

router.put("/:cid", verifyAccessToken, couponController.update);
router.delete("/:cid", verifyAccessToken, couponController.delete);
router.get("/", verifyAccessToken, couponController.getAll);
router.post("/", verifyAccessToken, couponController.create);

module.exports = router;
