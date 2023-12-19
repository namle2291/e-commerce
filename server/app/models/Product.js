const mongoose = require("mongoose"); // Erase if already required
var mongoose_delete = require("mongoose-delete");

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: Array,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    thumb: { type: String },
    color: {
      type: String,
    },
    raitings: [
      {
        star: {
          type: Number,
        },
        postedBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
      },
    ],
    totalRaitings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: 'all',
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
