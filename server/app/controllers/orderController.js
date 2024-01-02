const Order = require("../models/Order");
const Coupon = require("../models/Coupon");
const User = require("../models/User");

class orderController {
  async create(req, res, next) {
    try {
      // Lấy ra id user
      const { _id } = req.user;

      const { products, total, address } = req.body;

      const order = await Order.create({
        products,
        total,
        orderBy: _id,
      });

      if (order) {
        // Cập nhật lại trường cart thành rỗng
        await User.findByIdAndUpdate(_id, { address, cart: [] });
      }

      res.json({
        success: order ? true : false,
        order,
      });
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
