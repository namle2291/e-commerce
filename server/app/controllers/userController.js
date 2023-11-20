const User = require("../models/User");
const {
    generateAccessToken,
    generatePrefreshToken
} = require("../middlewares/jwt");

class userController {
    async register(req, res, next) {
        try {
            const {
                email,
                first_name,
                last_name,
                mobile,
                password
            } = req.body;

            if (!email || !first_name || !last_name || !mobile || !password) {
                throw new Error("Missing inputs!!!");
            }

            const user = await User.create(req.body);

            res.status(200).json({
                status: user ? true : false,
                message: user ? "Register success, please login!!!" : "Something wrong!!!"
            });

        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body;

            if (!email || !password) {
                throw new Error("Missing inputs!!!")
            }

            const response = await User.findOne({
                email
            });

            if (response && await response.isCorrectPassword(password)) {
                // Lấy ra một số trường cần thiết
                const {
                    password,
                    role,
                    ...userData
                } = response.toObject();
                // Tạo access token
                const access_token = generateAccessToken(response._id, response.role);
                // Tạo prefresh token
                const prefresh_token = generatePrefreshToken(response._id);
                // Lưu prefresh token vào database
                await User.findByIdAndUpdate(response._id, {
                    refreshToken: prefresh_token
                }, {
                    new: true
                })
                res.cookie("prefresh_token", prefresh_token, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 *1000
                });
                res.json({
                    success: true,
                    userData,
                    access_token
                });
            } else {
                throw new Error("Invalid credentials!!!")
            }
        } catch (error) {
            next(error);
        }
    }
    async getCurrentUser(req,res,next){
        const {uid} = req.user;
        const user = User.findById(uid);
        res.json({
            success: true,
            user
        });
    }
}

module.exports = new userController;