const userRoute = require("./user");
const {notFoundHandler,errorHandler} = require("../app/exceptions/handler");

function initRoute(app){
    app.use("/api/users", userRoute);

    // handlers
    app.use(notFoundHandler);
    app.use(errorHandler);
}

module.exports = initRoute;