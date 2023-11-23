const userRoute = require("./user");
const productRoute = require("./product");
const categoryRoute = require("./category");
const brandRoute = require("./brand");
const blogCategoryRoute = require("./blogCategory");
const blogRoute = require("./blog");
const couponRoute = require("./coupon");

const { notFoundHandler, errorHandler } = require("../app/exceptions/handler");

function initRoute(app) {
  // Apis
  app.use("/api/users", userRoute);
  app.use("/api/products", productRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/brands", brandRoute);
  app.use("/api/blog-categories", blogCategoryRoute);
  app.use("/api/blogs", blogRoute);
  app.use("/api/coupons", couponRoute);

  // handlers
  app.use(notFoundHandler);
  app.use(errorHandler);
}

module.exports = initRoute;
