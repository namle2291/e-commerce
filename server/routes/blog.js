const router = require("express").Router();
const blogController = require("../app/controllers/blogController");
// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");

router.get("/", [verifyAccessToken], blogController.getAll);
router.post("/", [verifyAccessToken, isAdmin], blogController.create);
router.put("/:bid", [verifyAccessToken], blogController.update);
router.put("/:bid/like", [verifyAccessToken], blogController.like);
router.put("/:bid/dislike", [verifyAccessToken], blogController.dislike);
router.delete("/:bid", [verifyAccessToken], blogController.delete);

module.exports = router;