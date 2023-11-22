const router = require("express").Router();
const productController = require("../app/controllers/productController");
// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");

// Routes
router.get("/:pid",verifyAccessToken, productController.show);
router.put("/:pid",verifyAccessToken, productController.update);
router.delete("/:pid",verifyAccessToken,isAdmin, productController.delete);
router.post("/",verifyAccessToken,isAdmin, productController.create);
router.get("/",verifyAccessToken, productController.getAll);

module.exports = router;