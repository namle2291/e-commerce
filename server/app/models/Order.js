const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 0 },
      color: { type: String },
    },
  ],
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: "Coupon",
  },
  total: { type: Number },
  status: {
    type: String,
    default: "Processing",
    enum: ["Processing", "Canceled", "Successed"],
  },
  payment_intent: {
    type: String,
  },
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
