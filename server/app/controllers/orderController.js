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

      // Tính tổng tiền
      let total = userCart?.cart?.reduce((sum, el) => {
        return sum + el.product.price * el.quantity;
      }, 0);

      // Tính giảm giá nếu có
      if (coupon) {
        total = total - (total * coupon) / 100;
      }

      const order = await Order.create({
        products: userCart.cart,
        payment_intent,
        total,
        orderBy: _id,
      });

      if (order) {
        // Cập nhật lại trường cart thành rỗng
        await User.findByIdAndUpdate(_id, { cart: [] });
      }

      res.json({
        order,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new orderController();
