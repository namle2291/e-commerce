const { listenerCount } = require("../models/Blog");
const Coupon = require("../models/Coupon");
const { listeners } = require("../models/User");

class couponController {
  async getAll(req, res, next) {
    try {
      const coupons = await Coupon.find();
      res.json({
        success: true,
        data: coupons,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const { name, discount, expiry } = req.body;

      if (!name || !discount || !expiry) throw new Error("Missing inputs!");

      if (Object.keys(req.body).length <= 0) throw new Error("Missing inputs!");

      const coupon = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        coupon,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { cid } = req.params;
      const {expiry } = req.body;

      if (Object.keys(req.body).length <= 0) throw new Error("Missing inputs!");

      const coupon = await Coupon.findByIdAndUpdate(cid, {
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
      }, {
        new: true,
      });

      res.json({
        success: true,
        coupon,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { cid } = req.params;

      const coupon = await Coupon.findByIdAndDelete(cid);

      res.json({
        success: true,
        message: coupon
          ? `Coupon (${coupon.name}) deleted`
          : "Something went wrong!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new couponController();
