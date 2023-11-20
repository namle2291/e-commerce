const router = require("express").Router();
const userController = require('../app/controllers/userController');

router.post("/register", userController.register);

router.get("/", (req,res)=>{
    res.json([1,2,3]);
})

module.exports = router;