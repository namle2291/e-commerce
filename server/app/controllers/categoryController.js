const Category = require("../models/Category");

const categoriesData = require("../../data/categories");

class categoryController {
  async getAll(req, res, next) {
    try {
      const categories = await Category.find().select("_id title");
      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      if (!req.body.title) throw new Error("Missing inputs!");

      const category = await Category.create(req.body);

      res.json({
        success: true,
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { cid } = req.params;

      if (!req.body.title) throw new Error("Missing inputs!");

      const category = await Category.findByIdAndUpdate(cid, req.body, {
        new: true,
      });

      res.json({
        success: true,
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { cid } = req.params;

      const category = await Category.findByIdAndDelete(cid);

      res.json({
        success: true,
        message: category
          ? `Category (${category.title}) deleted`
          : "Something went wrong!",
      });
    } catch (error) {
      next(error);
    }
  }
  async insertData(req, res, next) {
    try {
      categoriesData.map(async (el) => {
        await Category.create({ title: el.name });
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new categoryController();
