const User = require("../models/User");
const jwt = require('jsonwebtoken');

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
                const refresh_token = generatePrefreshToken(response._id);
                // Lưu prefresh token vào database
                await User.findByIdAndUpdate(response._id, {
                    refreshToken: refresh_token
                }, {
                    new: true
                })
                // Lưu refresh token vào cookie
                res.cookie("refresh_token", refresh_token, {
                    httpOnly: true,
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
    async getCurrentUser(req, res, next) {
        const {
            _id
        } = req.user;
        const user = await User.findById(_id).select("-password -role -refreshToken");
        res.json({
            success: user ? true : false,
            result: user ? user : "User not found!!!"
        });
    }
    // Refresh token
    async refreshToken(req, res, next) {
        try {
            // Lấy refresh token từ cookie
            const cookie = req.cookies;
            // Check refresh token có tồn tại
            if (!cookie || !cookie.refresh_token) throw new Error("Not found refresh token in cookies");
            // Kiếm tra refresh token có hợp lệ
            const rs = jwt.verify(cookie.refresh_token, process.env.TOKEN_SECRET);

            const user = await User.findOne({
                _id: rs._id,
                refreshToken: cookie.refresh_token
            });

            return res.json({
                status: user ? true : false,
                newRefreshToken: user ? generateAccessToken(user._id, user.role) : "Refresh token not matched"
            });
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new userController;