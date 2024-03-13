const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    code: {
        type: String,
        require: [true, "Please Enter the Coupon Code"],
        unique: true,
    },
    amount: {
        type: Number,
        require: [true, "Please Enter the Discount Amount"],
    }
})

const Coupon = mongoose.model("Coupon", schema)
module.exports = { Coupon }