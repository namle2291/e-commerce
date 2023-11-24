const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const brandRouter = require("./brand");
const blogCategoryRouter = require("./blogCategory");
const blogRouter = require("./blog");
const couponRouter = require("./coupon");
const orderRouter = require("./order");

const { notFoundHandler, errorHandler } = require("../app/exceptions/handler");

function initRoute(app) {
  // Apis
  app.use("/api/users", userRouter);
  app.use("/api/products", productRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/blog-categories", blogCategoryRouter);
  app.use("/api/blogs", blogRouter);
  app.use("/api/coupons", couponRouter);
  app.use("/api/orders", orderRouter);
  // handlers
  app.use(notFoundHandler);
  app.use(errorHandler);
}

module.exports = initRoute;
