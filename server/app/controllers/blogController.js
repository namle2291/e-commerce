const Blog = require("../models/Blog");

class blogController {
  async getAll(req, res, next) {
    try {
      const blogs = await Blog.find().populate({
        // Populate tham chiếu đến bảng User và select một số trường
        path: "likes",
        select: "email first_name last_name",
      });
      res.json({
        success: true,
        data: blogs,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      if (Object.keys(req.body).length <= 0) throw new Error("Missing inputs!");

      const { title, category, description } = req.body;
      if (!title || !category || !description)
        throw new Error("Missing inputs!");

      const blog = await Blog.create(req.body);

      res.json({
        success: true,
        blog,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { bid } = req.params;

      if (Object.keys(req.body).length <= 0) throw new Error("Missing inputs!");

      const blog = await Blog.findByIdAndUpdate(bid, req.body, { new: true });

      res.json({
        success: true,
        blog,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { bid } = req.params;

      const blog = await Blog.findByIdAndDelete(bid);

      res.json({
        success: true,
        message: blog ? `blog (${blog.title}) deleted` : "Can not delete blog",
      });
    } catch (error) {
      next(error);
    }
  }
  async like(req, res, next) {
    try {
      const { bid } = req.params;
      const { _id } = req.user;
      const blog = await Blog.findById(bid);
      //   Kiểm tra user có like hay chưa
      const userLiked = blog.likes.find((el) => el._id.toString() === _id);
      //   Có thì xóa khỏi trường likes
      if (userLiked) {
        const updatedProduct = await Blog.findByIdAndUpdate(
          { _id: bid },
          { $pull: { likes: _id } },
          { new: true }
        );
        res.json({
          success: true,
          updatedProduct,
        });
      } else {
        const updatedBlog = await Blog.findByIdAndUpdate(
          bid,
          {
            $push: { likes: _id },
            $pull: { dislikes: _id }, // Xóa trường dislike nếu thêm likes
          },
          { new: true }
        );
        res.json({
          success: true,
          updatedBlog,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async dislike(req, res, next) {
    try {
      const { bid } = req.params;
      const { _id } = req.user;
      const blog = await Blog.findById(bid);
      //   Kiểm tra user có dislike hay không
      const userDisliked = blog.dislikes.find(
        (el) => el._id.toString() === _id
      );
      //   Nếu có thì xóa khỏi trường dislikes
      if (userDisliked) {
        const updatedProduct = await Blog.findByIdAndUpdate(
          { _id: bid },
          { $pull: { dislikes: _id } },
          { new: true }
        );
        res.json({
          success: true,
          updatedProduct,
        });
      } else {
        const updatedBlog = await Blog.findByIdAndUpdate(
          bid,
          {
            $push: { dislikes: _id },
            $pull: { likes: _id }, // Xóa trường like nếu thêm dislikes
          },
          { new: true }
        );
        res.json({
          success: true,
          updatedBlog,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new blogController();
