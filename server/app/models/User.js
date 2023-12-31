const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const saltRounds = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    first_name: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default:
        "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png",
    },
    mobile: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      enum: [229, 612],
      default: 612,
    },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        color: { type: String },
        title: { type: String },
        thumb: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        stock: { type: Number },
      },
    ],
    wishlist: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
      },
    ],
    address: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordChangeAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExprises: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Prev save
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Define methods
userSchema.methods = {
  isCorrectPassword: async function (password) {
    const res = await bcrypt.compare(password, this.password);
    return res;
  },
  createpasswordChangeToken: function () {
    // Tạo random
    const randomBytes = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(randomBytes)
      .digest("hex");
    // Cập nhật thời gian hiệu lực 15 phút
    this.passwordResetExprises = Date.now() + 15 * 60 * 1000;
    return this.passwordResetToken;
  },
};

module.exports = mongoose.model("User", userSchema);
