const Category = require("../models/Category");

const categoryData = require("../../data/category");

class categoryController {
  async getAll(req, res, next) {
    try {
      const query = Category.find();

      if (req.query.page && req.query.limit) {
        let page = +req.query.page || 1; // thêm dấu + convert sang number
        let limit = +req.query.limit || 2; // thêm dấu + convert sang number
        let skip = (page - 1) * limit;
        query.skip(skip).limit(limit);
      }

      const categories = await query;

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

      if (req.file) {
        req.body.thumb = req.file?.path;
      }

      const category = await Category.create(req.body);

      res.json({
        success: category ? true : false,
        message: category
          ? "Create category success!"
          : "Create category success!",
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { cid } = req.params;

      if (!req.body.title) throw new Error("Missing inputs!");

      if (req.file) {
        req.body.thumb = req.file?.path;
      }

      const category = await Category.findByIdAndUpdate(cid, req.body, {
        new: true,
      });

      res.json({
        success: category ? true : false,
        category,
        message: category
          ? `Category ${category.title} updated!`
          : `Update fail!`,
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
      categoryData.map(async (el) => {
        await Category.create({
          title: el.cate,
          brand: el.brand,
          thumb: el.thumb,
        });
      });
      res.json({
        success: true,
        mes: "Done...",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new categoryController();
