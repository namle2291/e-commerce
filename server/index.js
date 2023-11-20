const express = require("express");
const initRoute = require("./routes");
const connectDB = require("./app/config/database");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
// Config
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Connect Database
connectDB();
// Route
initRoute(app);

app.listen(port, () => {
    console.log("App runing with port " + port);
});