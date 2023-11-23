const Brand = require("../models/Brand");

class brandController {
  async getAll(req, res, next) {
    try {
      const brands = await Brand.find();
      res.json({
        success: true,
        data: brands,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      if (!req.body.title) throw new Error("Missing inputs!");

      const brand = await Brand.create(req.body);

      res.json({
        success: true,
        brand,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { bid } = req.params;

      if (!req.body.title) throw new Error("Missing inputs!");

      const brand = await Brand.findByIdAndUpdate(bid, req.body, {
        new: true,
      });

      res.json({
        success: true,
        brand,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { bid } = req.params;

      const brand = await Brand.findByIdAndDelete(bid);

      res.json({
        success: true,
        message: brand
          ? `Brand (${brand.title}) deleted`
          : "Something went wrong!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new brandController();
