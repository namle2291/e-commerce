const router = require("express").Router();
const userController = require('../app/controllers/userController');
const verifyAccessToken = require("../app/middlewares/verifyAccessToken");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current",verifyAccessToken, userController.getCurrentUser);
router.get("/refresh-token", userController.refreshToken);

module.exports = router;