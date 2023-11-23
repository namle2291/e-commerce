const router = require("express").Router();
const blogCategoryController = require("../app/controllers/blogCategoryController");
// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");

router.put("/:pcid", verifyAccessToken, blogCategoryController.update);
router.delete("/:pcid", verifyAccessToken, blogCategoryController.delete);
router.get("/", verifyAccessToken, blogCategoryController.getAll);
router.post("/", verifyAccessToken, blogCategoryController.create);

module.exports = router;
