const router = require("express").Router();
const categoryController = require("../app/controllers/categoryController");
// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");
// Cloundinary
const uploadCLD = require("../app/config/cloudinary.config");

router.put(
  "/:cid",
  verifyAccessToken,
  uploadCLD.single("thumb"),
  categoryController.update
);
router.delete("/:cid", verifyAccessToken, categoryController.delete);
router.get("/", categoryController.getAll);
router.post(
  "/",
  verifyAccessToken,
  uploadCLD.single("thumb"),
  categoryController.create
);

router.get("/insert", categoryController.insertData);

module.exports = router;
