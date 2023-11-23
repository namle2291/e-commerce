const router = require("express").Router();
const productController = require("../app/controllers/productController");
// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");
const uploadCLD = require("../app/config/cloudinary.config");

// Routes
router.put("/raiting", verifyAccessToken, productController.raiting);

router.put(
  "/:pid/upload-image",
  verifyAccessToken,
  uploadCLD.array("images", 10),
  productController.uploadImage
);

router.get("/:pid", verifyAccessToken, productController.show);
router.put("/:pid", verifyAccessToken, productController.update);
router.delete("/:pid", verifyAccessToken, isAdmin, productController.delete);
router.post("/", verifyAccessToken, isAdmin, productController.create);
router.get("/", verifyAccessToken, productController.getAll);

module.exports = router;
