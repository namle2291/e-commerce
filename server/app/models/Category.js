const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: { type: Array },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Category", categorySchema);
