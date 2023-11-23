const router = require("express").Router();
const brandController = require("../app/controllers/brandController");
// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");

router.put("/:cid", verifyAccessToken, brandController.update);
router.delete("/:cid", verifyAccessToken, brandController.delete);
router.get("/", verifyAccessToken, brandController.getAll);
router.post("/", verifyAccessToken, brandController.create);

module.exports = router;
