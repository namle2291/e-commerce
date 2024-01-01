const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect Success!!!");
  } catch (error) {
    console.log("Connect Failure!!!");
  }
}

module.exports = connectDB;
