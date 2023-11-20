const userRoute = require("./user");

function initRoute(app){
    app.use("/api/users", userRoute);
}

module.exports = initRoute;