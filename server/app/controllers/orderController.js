const Order = require("../models/Order");
const Coupon = require("../models/Coupon");
const User = require("../models/User");

class orderController {
  async create(req, res, next) {
    try {
      // Lấy ra id user
      const { _id } = req.user;

      const { payment_intent, coupon } = req.body;

      if (!payment_intent) throw new Error("Missing inputs!");

      // Tìm user và lấy cart
      const userCart = await User.findById(_id)
        .select("cart")
        .populate("cart.product", "title price");

      if (userCart.cart.length > 0) {
        // Tính tổng tiền
        let total = userCart?.cart?.reduce((sum, el) => {
          return sum + el.product.price * el.quantity;
        }, 0);

        // Tính giảm giá nếu có
        if (coupon) {
          const findCoupon = await Coupon.findById(coupon);
          total = total - (total * findCoupon.discount) / 100;
        }

        const order = await Order.create({
          products: userCart.cart,
          payment_intent,
          total,
          coupon,
          orderBy: _id,
        });

        if (order) {
          // Cập nhật lại trường cart thành rỗng
          await User.findByIdAndUpdate(_id, { cart: [] });
        }

        res.json({
          success: true,
          order,
        });
      } else {
        res.json({
          success: false,
          message: "No products in cart!",
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async updateStatus(req, res, next) {
    try {
      const { oid } = req.params;

      const { status } = req.body;
      if (!status) throw new Error("Missing input!");

      const order = await Order.findByIdAndUpdate(
        oid,
        { status },
        { new: true }
      );

      res.json({
        success: true,
        order,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new orderController();
