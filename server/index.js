const express = require("express");
const initRoute = require("./routes");
const connectDB = require("./app/config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
// Config
app.use(
  cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect Database
connectDB();
// Route
initRoute(app);

app.listen(port, () => {
  console.log("App runing with port " + port);
});
