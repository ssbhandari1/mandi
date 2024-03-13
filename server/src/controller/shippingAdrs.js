const Address = require("../models/shippingAdrs.jsx");

const createShippingAdrs = async(req, res, next )=>{
    const {shippingInfo, userId} = req.body;
    try {
        if (!shippingInfo || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all the fields",
            });
        }
        await Address.create({
            shippingInfo,
            userId
            
        })
      return res.status(201).json({
        success:true,
        stepCode:"Address",
        message:"Address Saved",
    })
    } catch (error) {
        console.log("erorrrrrr",error)
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}

const updateShippingAdrs = async(req, res, next )=>{
    const {shippingInfo, userId} = req.body;
    try {
        if (!shippingInfo || !userId) 
           {
            return res.status(400).json({
                success: false,
                message: "Please provide shipping information ",
            });
           }
        
    const data = await Address.findOneAndUpdate(
            { userId },
            {$set:{shippingInfo: shippingInfo}  },
            { new: true}   // return updated data
        )
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Bad request",
            });
        }
      return res.status(201).json({
        success:true,
        stepCode:"Address",
        message:"Shipping information updated",
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}


const existingAddress = async(req, res, next )=>{
    const { userId } = req.query;
    try {
 
     let existingAddress = await Address.find({userId})
     return res.status(200).json({
        success: true,
        shippingAddress: existingAddress[0],
        message: 'Data retrieved',
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}

module.exports = { createShippingAdrs, existingAddress, updateShippingAdrs}