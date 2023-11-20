const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGOO_URI);
        console.log("Connect Success!!!");
    } catch (error) {
        console.log("Connect Failure!!!");
    }
}

module.exports = connectDB;