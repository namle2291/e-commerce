const BlogCategory = require("../models/BlogCategory");

class blogCategoryController {
  async getAll(req, res, next) {
    try {
      const blogCategory = await BlogCategory.find();
      res.json({
        success: true,
        data: blogCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      if (!req.body.title) throw new Error("Missing inputs!");

      const blogCategory = await BlogCategory.create(req.body);

      res.json({
        success: true,
        blogCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { pcid } = req.params;

      if (!req.body.title) throw new Error("Missing inputs!");

      const blogCategory = await BlogCategory.findByIdAndUpdate(
        pcid,
        req.body,
        {
          new: true,
        }
      );

      res.json({
        success: true,
        blogCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { pcid } = req.params;

      const blogCategory = await BlogCategory.findByIdAndDelete(pcid);

      res.json({
        success: true,
        message: blogCategory
          ? `Category (${blogCategory.title}) deleted`
          : "Something went wrong!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new blogCategoryController();
