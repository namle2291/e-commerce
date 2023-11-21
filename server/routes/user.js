const router = require("express").Router();
const userController = require('../app/controllers/userController');
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");
const isAdmin = require("../app/middlewares/isAdmin");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/current", verifyAccessToken, userController.getCurrentUser);
router.get("/refresh-token", userController.refreshToken);
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password", userController.resetPassword);
router.get("/", verifyAccessToken, isAdmin, userController.getAll);

module.exports = router;