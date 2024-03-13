const  express = require("express");
const { newCoupon, applyDiscount, allCoupons, deleteCoupon } = require("../controller/payment.js");
const adminOnly = require("../middlewares/auth.js");
const app = express.Router();

//route - /api/v1/payment/coupon/new
app.post('/coupon/new', adminOnly, newCoupon);

//route - /api/v1/payment/discount
app.get('/discount',applyDiscount);

//route - /api/v1/payment/coupon/all
app.get('/coupon/all', adminOnly, allCoupons);

//route - /api/v1/payment/coupon/:id
app.delete('/coupon/:id', adminOnly, deleteCoupon);

module.exports=app
