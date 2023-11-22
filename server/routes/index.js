const userRoute = require("./user");
const productRoute = require("./product");

const { notFoundHandler, errorHandler } = require("../app/exceptions/handler");

function initRoute(app) {
  app.use("/api/users", userRoute);
  app.use("/api/products", productRoute);

  // handlers
  app.use(notFoundHandler);
  app.use(errorHandler);
}

module.exports = initRoute;
