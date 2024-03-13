const { Coupon } = require("../models/coupon");


const newCoupon=async(req, res, next)=>{
    const { coupon, amount} = req.body;
    try {
        if(!coupon || !amount){
            return res.status(400).json({
                success: false,
                message: `Please Enter Both Coupon and amount`
            }) 
        }
        await Coupon.create({ code: coupon, amount})
        return res.status(201).json({
            success: true,
            message: `Coupon ${coupon} Created SuccessFully`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error`
        })
    }
}


const applyDiscount=async(req, res, next)=>{
    const { coupon} = req.query;
    try {
       const discount = await Coupon.findOne({code: coupon})
       if(!discount){
        return res.status(400).json({
            success: false,
            message: `Invailid Coupn Code`
        })
       }
       return res.status(200).json({
        success: true,
       discount:discount.amount
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error`
        })
    }
}

const allCoupons=async(req, res, next)=>{
    try {

        const coupons = await Coupon.find({})

       return res.status(200).json({
        success: true,
        coupons,
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error`
        })
    }
}

const deleteCoupon=async(req, res, next)=>{
    const { id } = req.params;
    try {

      const coupon = await Coupon.findByIdAndDelete(id)
  if(!coupon){
    return res.status(400).json({
        success: false,
        message: `Invailid Coupon ID`
    })
  }
       return res.status(200).json({
        success: true,
        message: `Coupon Delete Successfully`
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error`
        })
    }
}

module.exports = { newCoupon, applyDiscount, allCoupons, deleteCoupon }