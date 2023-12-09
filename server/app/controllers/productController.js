const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const slugify = require("slugify");
const productData = require("../../data/data2");
const randomComment = require("../../utils/randomComment");

class productController {
  async getAll(req, res, next) {
    try {
      const queryObj = {
        ...req.query,
      };
      // Loại một số trường ra khỏi request query
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);

      // Lọc nâng cao
      let queryString = JSON.stringify(queryObj);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      let formatQueries = JSON.parse(queryString);
      let colorQueriesObject = {};

      if (queryObj?.color) {
        delete formatQueries.color;
        const colorArr = queryObj?.color.split(",");
        const colorQuery = colorArr.map((el) => ({
          color: { $regex: el, $options: "i" },
        }));
        colorQueriesObject = { $or: colorQuery };
      }

      const q = { ...colorQueriesObject, ...formatQueries };

      let query = Product.find(q);

      // Sắp xếp
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      }

      // Giới hạn một số trường
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      }

      // Phân trang
      // 1 2 3 4 5
      // (2 - 1) * 2
      if (req.query.page && req.query.limit) {
        let page = +req.query.page || 1; // thêm dấu + convert sang number
        let limit = +req.query.limit || 2; // thêm dấu + convert sang number
        let skip = (page - 1) * limit;

        query.skip(skip).limit(limit);
      }

      const products = await query.populate("category");

      const total = await Product.find(q).countDocuments();

      res.json({
        success: products ? true : false,
        total,
        data: products ? products : "Not data found!",
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      if (Object.keys(req.body).length <= 0) throw new Error("Missing inputs!");
      // Tạo slug theo title
      const { title } = req.body;
      req.body.slug = slugify(title, {
        locale: "vi",
      });

      const product = await Product.create(req.body);

      res.json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { pid } = req.params;
      if (!pid) throw new Error("Missing product id!");

      if (Object.keys(req.body).length <= 0) throw new Error("Missing inputs!");
      // Tạo slug theo title
      const { title } = req.body;
      req.body.slug = slugify(title, {
        locale: "vi",
      });

      const product = await Product.findByIdAndUpdate(pid, req.body, {
        new: true,
      });

      res.json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { pid } = req.params;
      if (!pid) throw new Error("Missing product id!");

      const product = await Product.findByIdAndDelete(pid);

      res.json({
        success: true,
        message: product
          ? `Product ${product.title} deleted`
          : "Something went wrong!",
      });
    } catch (error) {
      next(error);
    }
  }
  async show(req, res, next) {
    try {
      const { pid } = req.params;
      if (!pid) throw new Error("Missing product id!");

      const product = await Product.findOne({
        _id: pid,
      })
        .populate("category", "title")
        .populate("raitings.postedBy", "first_name last_name");

      res.json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  async raiting(req, res, next) {
    try {
      const { _id } = req.user;

      const { star, comment, pid } = req.body;

      if (!star || !pid) throw new Error("Missing inputs!");

      const product = await Product.findById(pid);
      // Kiểm tra người dùng đã đánh giá hay chưa
      const areadyRaiting = product?.raitings?.some(
        (el) => el.postedBy.toString() === _id
      );

      // Nếu đã đánh giá thì cập nhật lại
      if (areadyRaiting) {
        await Product.updateOne(
          { _id: pid, "raitings.postedBy": _id },
          { $set: { "raitings.$.star": star, "raitings.$.comment": comment } }
        );
      } else {
        // Nếu chưa thì tạo mới
        const response = await Product.findByIdAndUpdate(
          pid,
          { $push: { raitings: { star, comment, postedBy: _id } } },
          { new: true }
        );
      }

      // Cập nhật xếp hạng trung bình
      const updatedProduct = await Product.findById(pid);
      const totalRaiting = updatedProduct.raitings.length;
      // Tính tổng star
      const sumRaitings = updatedProduct.raitings.reduce(
        (sum, el) => sum + el.star,
        0
      );
      // Lấy tổng star chia cho số lượng star
      updatedProduct.totalRaitings = sumRaitings / totalRaiting;
      updatedProduct.save();

      res.json({
        success: true,
        product: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  async uploadImage(req, res, next) {
    try {
      const { pid } = req.params;

      if (!req.files) throw new Error("File not found!");

      const product = await Product.findByIdAndUpdate(
        pid,
        {
          $push: { images: { $each: req.files.map((el) => el.path) } },
        },
        { new: true }
      );

      res.json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  async insertData(req, res, next) {
    try {
      productData.map(async (el) => {
        const catName = el["category"][1];

        let pd = {};

        pd.title = el["name"];
        pd.slug =
          slugify(el["name"], {
            locale: "vi",
          }) +
          "-" +
          Math.ceil(Math.random() * 100);
        pd.price = el["price"].split(",")[0].split(".").join("");
        pd.thumb = el["thumb"];
        pd.images = el["images"];
        pd.description = el["description"];
        pd.brand = el["name"].split(" ")[0];
        pd.totalRaitings = Math.ceil(Math.random() * 5);
        pd.quantity = Math.ceil(Math.random() * 200);
        pd.sold = Math.ceil(Math.random() * 100);
        pd.raitings = await randomComment(Math.ceil(Math.random() * 6));

        const colorArr = el["variants"].find((el) => el["label"] === "Color");
        if (colorArr) {
          pd.color = colorArr["variants"][0];
        } else {
          pd.color = undefined;
        }

        const categoryRes = await Category.findOne({ title: catName });

        if (categoryRes) {
          pd.category = new mongoose.Types.ObjectId(categoryRes._id);
        }
        await Product.create(pd);
        console.log("Đã thêm sản phẩm: " + el["name"]);
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
module.exports = new productController();
