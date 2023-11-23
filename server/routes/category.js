const router = require("express").Router();
const categoryController = require("../app/controllers/categoryController");
// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");

router.put("/:cid",verifyAccessToken, categoryController.update);
router.delete("/:cid",verifyAccessToken, categoryController.delete);
router.get("/",verifyAccessToken, categoryController.getAll);
router.post("/",verifyAccessToken, categoryController.create);

module.exports = router;