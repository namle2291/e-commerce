const router = require("express").Router();

router.get("/register", (req,res)=>{
    res.send("Register");
})
router.get("/", (req,res)=>{
    res.json([1,2,3]);
})

module.exports = router;