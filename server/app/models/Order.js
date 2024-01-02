const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      color: { type: String },
      title: { type: String },
      thumb: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
  total: { type: Number },
  status: {
    type: String,
    default: "Processing",
    enum: ["Processing", "Canceled", "Successed"],
  },
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
