const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const sendMail = require("../../utils/sendMail");
var randomstring = require("randomstring");

const {
  generateAccessToken,
  generatePrefreshToken,
} = require("../middlewares/jwt");

class userController {
  async getAll(req, res, next) {
    try {
      const queryObj = { ...req.query };
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);

      const queryString = JSON.stringify(queryObj);
      const formatQueryString = JSON.parse(queryString);

      if (req.query.q) {
        delete formatQueryString.q;
        formatQueryString["$or"] = [
          { first_name: { $regex: req.query.q, $options: "i" } },
          { last_name: { $regex: req.query.q, $options: "i" } },
          { email: { $regex: req.query.q, $options: "i" } },
        ];
      }

      let query = User.find(formatQueryString).select(
        "-password -refreshToken -passwordResetToken"
      );

      if (req.query.page) {
        let page = req.query.page || 1;
        let limit = req.query.limit || 2;
        page = (page - 1) * limit;
        query = query.skip(+page).limit(+limit);
      }

      const users = await query;

      const total = await User.find(formatQueryString).countDocuments();

      res.json({
        success: true,
        total,
        users,
      });
    } catch (error) {
      next(error);
    }
  }
  async register(req, res, next) {
    try {
      const { email, first_name, last_name, mobile, password } = req.body;

      if (!email || !first_name || !last_name || !mobile || !password) {
        throw new Error("Missing inputs!!!");
      }

      const user = await User.findOne({ email });

      if (user) throw new Error("User existed!");

      const code = randomstring.generate({
        length: 6,
        charset: "numeric",
      });

      const html = `<div>Xin chào ${last_name},</div>
        <div><strong>${code}</strong> là mã xác thực của bạn.</div>
      `;

      const payload = {
        email,
        html,
        subject: "Xác minh email",
      };

      sendMail(payload);

      res.cookie(
        "userRegister",
        { ...req.body, code },
        {
          maxAge: 15 * 60 * 1000,
          httpOnly: false,
        }
      );

      res.status(200).json({
        success: true,
        message: "Verify Email",
      });
    } catch (error) {
      next(error);
    }
  }
  async verifyEmail(req, res, next) {
    try {
      const { verifyCode } = req.body;

      if (!verifyCode) {
        throw new Error("Invalid Code!!!");
      }

      const { code, ...userData } = req.cookies.userRegister;

      if (code !== verifyCode) {
        throw new Error("Invalid Code!!!");
      }

      const user = await User.create(userData);

      if (user) {
        res.clearCookie("userRegister");
      }

      res.json({
        success: user ? true : false,
        message: user
          ? "Register success, please login!!!"
          : "Something wrong!!!",
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Missing inputs!!!");
      }

      const response = await User.findOne({
        email,
      });

      if (response && (await response.isCorrectPassword(password))) {
        // Lấy ra một số trường cần thiết
        const {
          password,
          role,
          passwordChangeAt,
          isBlocked,
          updatedAt,
          ...userData
        } = response.toObject();
        // Tạo access token
        const access_token = generateAccessToken(response._id, response.role);
        // Tạo prefresh token
        const refresh_token = generatePrefreshToken(response._id);
        // Lưu prefresh token vào database
        await User.findByIdAndUpdate(
          response._id,
          {
            refreshToken: refresh_token,
          },
          {
            new: true,
          }
        );
        // Lưu refresh token vào cookie
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
        });
        res.json({
          success: true,
          access_token,
          userData,
        });
      } else {
        throw new Error("Invalid credentials!!!");
      }
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      // Lấy refresh token trong cookie
      const cookie = req.cookies;
      // Kiếm tra có refresh token hay không
      if (!cookie || !cookie.refresh_token)
        throw new Error("No refresh token in cookies");
      // Kiểm tra refresh token của user trong DB
      const user = await User.findOneAndUpdate(
        {
          refreshToken: cookie.refresh_token,
        },
        {
          refreshToken: "",
        },
        {
          new: true,
        }
      );

      if (!user) throw new Error("Invalid refresh token");
      // Nếu refresh token hợp lệ thì xóa khỏi cookie
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
      });

      res.json({
        success: true,
        mesage: "Logout success!",
      });
    } catch (error) {
      next(error);
    }
  }
  // Lấy thông tin user hiện tại
  async getCurrentUser(req, res, next) {
    const { _id } = req.user;

    const user = await User.findById(_id)
      .select("-password -refreshToken")
      .populate("cart.product")
      .populate("wishlist.product");

    res.json({
      success: user ? true : false,
      result: user ? user : "User not found!!!",
    });
  }
  async getOrderHistories(req, res) {
    const { _id } = req.user;

    const order = await Order.find({ orderBy: _id }).populate(
      "products.product"
    );

    res.json({
      success: order ? true : false,
      data: order ? order : "Orders not found!!!",
    });
  }
  // Cập nhật user hiện tại
  async updateCurrentUser(req, res, next) {
    try {
      const { _id } = req.user;
      // Lấy trường role ra khỏi request
      const { role, avatar, ...userData } = req.body;

      const file = req.file?.path;

      if (Object.keys(userData).length <= 0) throw new Error("Missing inputs");

      const user = await User.findByIdAndUpdate(
        _id,
        { ...userData, avatar: file },
        {
          new: true,
        }
      ).select("-password -role -refreshToken");

      res.json({
        success: user ? true : false,
        message: user
          ? "Update infomation success!"
          : "Update infomation fail!",
        data: {
          email: user?.email,
          first_name: user?.first_name,
          last_name: user?.last_name,
          mobile: user?.mobile,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateAddress(req, res, next) {
    try {
      const { _id } = req.user;
      // Lấy trường role ra khỏi request
      const { address } = req.body;

      if (!address) throw new Error("Missing inputs");

      const user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { address },
        },
        { new: true }
      ).select("-password -role -refreshToken");

      res.json({
        success: user ? true : false,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  // Cập nhật user bởi admin
  async updateUserByAdmin(req, res, next) {
    try {
      const { uid } = req.params;

      if (!uid) throw new Error("Not found user id");

      if (Object.keys(req.body).length <= 0) throw new Error("Missing inputs");

      const user = await User.findByIdAndUpdate(uid, req.body, { new: true });

      res.json({
        success: user ? true : false,
        user,
        message: user ? `User with email ${user.email} updated` : "Update fail",
      });
    } catch (error) {
      next(error);
    }
  }
  // Delete user bởi admin
  async deleteUserByAdmin(req, res, next) {
    try {
      const { uid } = req.params;

      if (!uid) throw new Error("Not found user id");

      const user = await User.findByIdAndDelete(uid);

      res.json({
        success: user ? true : false,
        user,
        message: user ? `User with email ${user.email} deleted` : "Delete fail",
      });
    } catch (error) {
      next(error);
    }
  }
  // Refresh token
  async refreshToken(req, res, next) {
    try {
      // Lấy refresh token từ cookie
      const cookie = req.cookies;
      // Check refresh token có tồn tại
      if (!cookie || !cookie.refresh_token)
        throw new Error("Not found refresh token in cookies");
      // Kiếm tra refresh token có hợp lệ
      const rs = jwt.verify(cookie.refresh_token, process.env.TOKEN_SECRET);
      // Kiểm tra refresh token trong DB có hợp lệ
      const user = await User.findOne({
        _id: rs._id,
        refreshToken: cookie.refresh_token,
      });

      return res.json({
        success: user ? true : false,
        newRefreshToken: user
          ? generateAccessToken(user._id, user.role)
          : "Refresh token not matched",
      });
    } catch (error) {
      next(error);
    }
  }
  async forgotPassword(req, res, next) {
    try {
      // Lấy email từ request
      const email = req.body.email;
      // Validate email
      if (!email) throw new Error("Missing email!!!");
      // Kiểm tra user có tồn tại
      const user = await User.findOne({
        email,
      });
      // Không tìm thấy user
      if (!user) throw new Error("User not found!!!");

      // Nếu tìm thấy sẽ tạo token PasswordChange và lưu vào DB
      user.createpasswordChangeToken();
      user.save();

      // Tạo thẻ chứa nội dung trong mail
      const html = `<p>Vui lòng click vào đường link sau đây để thay đổi 
            mật khẩu của bạn. Lưu ý: đường link sẽ hết hạn sau 15 phút 
            <a href='${process.env.CLIENT_URL}/reset-password/${user.passwordResetToken}'>Click me</a> </p>`;
      // Tạo payload
      const payload = {
        email: user.email,
        html,
        subject: "Cập nhật mật khẩu",
      };
      // Gọi hàm sendMail và gửi payload
      sendMail(payload);

      res.json({
        success: true,
        message: "Please check your mail!",
      });
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req, res, next) {
    try {
      const { password, token } = req.body;

      if (!password || !token) throw new Error("Missing inputs!");

      const user = await User.findOne({
        passwordResetToken: token,
      });

      if (!user) throw new Error("Invalid reset token!");

      if (user.passwordResetExprises < Date.now())
        throw new Error("Token expired!");

      user.password = password;
      user.passwordChangeAt = Date.now();
      user.passwordResetToken = undefined;
      user.passwordResetExprises = undefined;
      user.save();

      res.json({
        success: true,
        message: "Password updated",
      });
    } catch (error) {
      next(error);
    }
  }
  async addToCart(req, res, next) {
    try {
      const { _id } = req.user;

      const { pid, quantity = 1, color, price, thumb, title, stock } = req.body;

      if (!(pid && color && price && thumb && title))
        throw new Error("Missing inputs!");

      const user = await User.findById(_id);

      const productExist = user?.cart?.find(
        (el) => el.product.toString() === pid && el.color.toString() === color
      );

      if (productExist) {
        const productColorExist = user?.cart?.find(
          (el) => el.product.toString() === pid && el.color.toString() === color
        );

        if (productColorExist) {
          // Cùng màu thì cập nhật quantity
          const response = await User.findOneAndUpdate(
            {
              _id,
              cart: { $elemMatch: { product: pid, color } },
            },
            { $set: { "cart.$.quantity": quantity } },
            { new: true }
          ).select("cart");
          res.json({
            success: true,
            cart: response.cart,
          });
        } else {
          // Kiểm tra id product hợp lệ trước khi thêm mới
          const product = await Product.findById(pid);
          const response = await User.findByIdAndUpdate(
            { _id, cart: { $elemMatch: { product: pid } } },
            {
              $push: {
                cart: { product, quantity, color, price, thumb, title, stock },
              },
            },
            { new: true }
          ).select("cart");
          res.json({
            success: true,
            cart: response.cart,
          });
        }
      } else {
        // Kiểm tra id product hợp lệ trước khi thêm mới
        const product = await Product.findById(pid);
        const response = await User.findByIdAndUpdate(
          _id,
          {
            $push: {
              cart: { product, quantity, color, price, thumb, title, stock },
            },
          },
          { new: true }
        );
        res.json({
          success: true,
          cart: response.cart,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async addToWishList(req, res) {
    const { pid } = req.body;

    const { _id } = req.user;

    if (!pid) throw new Error("Product id not found!");

    const user = await User.findById(_id);

    const existsWishList = user?.wishlist?.find(
      (el) => el.product.toString() === pid
    );

    if (existsWishList) {
      const response = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: { product: pid } },
        },
        { new: true }
      );
      res.json({
        success: response ? true : false,
      });
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: { product: pid } },
        },
        { new: true }
      );
      res.json({
        success: response ? true : false,
      });
    }
  }
  async updateCart(req, res, next) {
    try {
      const { _id } = req.user;

      if (!req.body) throw new Error("Missing inputs!");

      const user = await User.findByIdAndUpdate(_id, {
        cart: req.body,
      });

      res.json({
        success: user ? true : false,
        message: user ? "Update cart success!" : "Update cart fail!",
        cart: user ? user.cart : [],
      });
    } catch (error) {
      next(error);
    }
  }
  async removeCart(req, res, next) {
    try {
      const { _id } = req.user;
      const { pid, color } = req.body;

      if (!pid && !color) throw new Error("Missing inputs!");

      const user = await User.findByIdAndUpdate(_id, {
        $pull: {
          cart: { product: pid, color },
        },
      });

      res.json({
        success: user ? true : false,
        message: user ? "Remove item success!" : "Remove item fail!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new userController();
