const { default: mongoose } = require("mongoose");
const AddToCart = require("../models/AddToCart");


const addToCart = async(req, res, next )=>{
    const { userId, productId } = req.body;
    try {
        // const existingProduct = await AddToCart.findOne({ productId });
        // if (existingProduct) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Product already in cart",
                
        //     });
        // }
 
   const cartProduct = await AddToCart.create({
            userId,
            productId
        })
        return res.status(201).json({
            success:true,
            message:"Product Add To Cart ",
            cartProduct
        })
    } catch (error) {
       console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}
const getProductLength = async (req, res, next) => {
    const { userId } = req.query;
    try {
        const userProducts = await AddToCart.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: "$quantity" },
                    productIds:{ $push: "$productId"}
                }
            }
        ]);
        if (userProducts && userProducts.length  > 0) {
            return res.status(200).json({
                success: true,
                totalLength: userProducts[0].totalQuantity,
                productIds:userProducts[0].productIds
            });
        }

            return res.status(200).json({
                success: true,
                totalLength: 0,
                productIds: []
            });
        
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const getAddProduct = async (req, res, next) => {
    const { userId } = req.query;
    try {
        const addProducts = await AddToCart.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                  }
            },
            {
                $unwind: {
                    path: "$products",
                    preserveNullAndEmptyArrays: true
                  }
            }
        ]);
     return res.status(200).json({
        success: true,
        addProducts
       
    }); 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}



const deleteCartProduct = async (req, res, next) => {
    const {  productId } = req.query;
    try {
       const deleteProduct = await AddToCart.findById({_id:productId})
       if(!deleteProduct) {
        return res.status(400).json({
            success: false,
            message: " productId not match."
        });
       }
       await deleteProduct.deleteOne()
        return res.status(200).json({
            success: true,
            message: "Product removed  successfully.",
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}


const hadleCartQuantity = async(req, res, next )=>{
    const { productId, action } = req.body;
    console.log(req.body )
    try {
   const cartProduct = await AddToCart.findById({_id: productId})
   if(!cartProduct){
        return res.status(404).json({
        success:false,
        message: "Product not found in the cart."
    })
   }

   let newQuantity = cartProduct.quantity;
   if(action === 'increase') {
    newQuantity++;
   } else if(action === 'decrease') {
    if(newQuantity > 1) { 
        newQuantity--;
    } else {
        return res.status(400).json({
            success: false,
            message: "Quantity can't be less than 1."
        });
    }
   }
   cartProduct.quantity = newQuantity;
   await cartProduct.save();
        return res.status(200).json({
            success:true,
            message:"Product Add To Cart ",
            cartProduct
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}


module.exports = { addToCart, getProductLength, getAddProduct, deleteCartProduct, hadleCartQuantity}