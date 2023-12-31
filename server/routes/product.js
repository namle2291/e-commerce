const router = require("express").Router();
const productController = require("../app/controllers/productController");
// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");
const uploadCLD = require("../app/config/cloudinary.config");

// Routes
router.put("/raiting", verifyAccessToken, productController.raiting);
router.put(
  "/variant",
  verifyAccessToken,
  uploadCLD.fields([
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  productController.createVariant
);
// delete
router.get(
  "/recycle-bin",
  verifyAccessToken,
  isAdmin,
  productController.recycleBin
);
// Restore
router.get(
  "/:pid/restore",
  verifyAccessToken,
  productController.restoreProduct
);
// Destroy
router.delete(
  "/:pid/destroy",
  verifyAccessToken,
  isAdmin,
  productController.destroy
);
// update images
router.put(
  "/:pid/upload-image",
  verifyAccessToken,
  uploadCLD.array("images", 10),
  productController.uploadImage
);

// seeding data
router.get("/insert", productController.insertData);
// get detail
router.get("/:pid", productController.show);
// update
router.put(
  "/:pid",
  uploadCLD.single("thumb"),
  verifyAccessToken,
  productController.update
);
router.delete("/:pid", verifyAccessToken, isAdmin, productController.delete);
// create
router.post(
  "/",
  verifyAccessToken,
  isAdmin,
  uploadCLD.single("thumb"),
  productController.create
);
// get all
router.get("/", productController.getAll);

module.exports = router;
