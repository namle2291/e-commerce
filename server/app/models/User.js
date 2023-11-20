const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    last_name: {
        type: String,
        require: true
    },
    first_name: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: Array,
        default: []
    },
    wishlist: [{
        type: mongoose.Types.ObjectId,
        ref: "Products"
    }],
    address: {
        type: mongoose.Types.ObjectId,
        ref: "Address"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    passwordChangeAt: {
        type: String
    },
    passwordResetExprises: {
        type: String
    }
}, {
    timestamps: true
});

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
})

// Define methods
userSchema.methods = {
    isCorrectPassword: async function (password) {
        const res = await bcrypt.compare(password, this.password);
        return res;
    }
}

module.exports = mongoose.model("User", userSchema);