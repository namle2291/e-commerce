const userRoute = require("./user");
const productRoute = require("./product");
const categoryRoute = require("./category");
const blogCategoryRoute = require("./blogCategory");
const blogRoute = require("./blog");

const { notFoundHandler, errorHandler } = require("../app/exceptions/handler");

function initRoute(app) {
  app.use("/api/users", userRoute);
  app.use("/api/products", productRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/blog-categories", blogCategoryRoute);
  app.use("/api/blogs", blogRoute);

  // handlers
  app.use(notFoundHandler);
  app.use(errorHandler);
}

module.exports = initRoute;
