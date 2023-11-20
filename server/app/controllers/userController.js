class userController{
   async register(req,res,next){
        try {
            const {email, name, address, password, confirm_password} = req.body;

            if(!email || !name || !address || !password || !confirm_password){
                throw new Error("Missing inputs!!!");
            }

            if(password != confirm_password){
                throw new Error("Passwords do not match!");
            }

            res.status(200).json({
                status: true,
                data: req.body
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new userController;