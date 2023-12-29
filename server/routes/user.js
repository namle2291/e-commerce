const router = require("express").Router();
const userController = require("../app/controllers/userController");
const uploadCLD = require("../app/config/cloudinary.config");

// Middlewares
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");
// Register and login
router.post("/register", userController.register);
router.post("/verifyemail", userController.verifyEmail);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
// get current and update
router.put(
  "/current",
  verifyAccessToken,
  uploadCLD.single("avatar"),
  userController.updateCurrentUser
);
router.get("/current", verifyAccessToken, userController.getCurrentUser);
router.put("/address", verifyAccessToken, userController.updateAddress);
router.put("/cart", verifyAccessToken, userController.addToCart);
router.put("/cart/remove", verifyAccessToken, userController.removeCart);
router.put("/cart/update", verifyAccessToken, userController.updateCart);
// Reset password
router.get("/refresh-token", userController.refreshToken);
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password", userController.resetPassword);
// Get all user
router.get("/", userController.getAll);
// Update user by admin
router.put(
  "/:uid",
  verifyAccessToken,
  isAdmin,
  userController.updateUserByAdmin
);
router.delete(
  "/:uid",
  verifyAccessToken,
  isAdmin,
  userController.deleteUserByAdmin
);
// Exports
module.exports = router;
