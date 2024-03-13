const Order = require("../models/order.js");
const { reduceStock } = require("../utils/features.js");


const newOrder = async(req, res, next )=>{
    const {shippingInfo, orderItems, userId, totalQuantity, discount, subtotal, shippingCharges, tax, paymentStatus} = req.body;

    try {
        if(
            !shippingInfo ||
            !orderItems 
           
        )
        return res.status(404).json({
            success:false,
            message:"Please fill All the field",
        })
     await Order.create({
            shippingInfo,
            orderItems,
            totalQuantity,
            discount,
            subtotal,
            shippingCharges,
            tax,
            paymentStatus,
            userId
            
        })
      return res.status(201).json({
        success:true,
        stepCode:"Address",
        message:"Order Placed Successfully",
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}


const myOrder = async(req, res, next )=>{
    const { userId } = req.query;
    try {
 
     let orders = await Order.find({userId})
     return res.status(200).json({
        success: true,
        orders,
        message: 'Data retrieved from database',
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}





const allOrders = async(req, res, next )=>{
    try {
    //  const cachedData = getFromCache(`allOrder`);
    //  if (cachedData) {
    //      return res.status(200).json({
    //          success: true,
    //          orders: cachedData,
    //          message: 'Data retrieved from cache',
    //      });
    //  }
     let orders = await Order.find().populate("user","name")
    //  setToCache(`allOrder`, orders);
     return res.status(200).json({
        success: true,
        orders: orders,
        message: 'Data retrieved from database',
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}


const getSingleOrder = async(req, res, next )=>{
    const {id} = req.params;
    try {
    //  const cachedData = getFromCache(`order${id}`);
    //  if (cachedData) {
    //      return res.status(200).json({
    //          success: true,
    //          orders: cachedData,
    //          message: 'Data retrieved from cache',
    //      });
    //  }
     let order = await Order.findById(id).populate("user","name")
     if(!order){
        return res.status(404).json({
            success: false,
            message: 'Order Not found',
        });
     }

    //  setToCache(`order${id}`, orders);
     return res.status(200).json({
        success: true,
        order: order,
        message: 'Data retrieved from database',
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}



const proccessOrder = async(req, res, next )=>{
    const {id} = req.params;
  
    try {
const order = await Order.findById(id)
if(!order){
    return res.status(404).json({
        success:false,
        message:"Order Not Found",
    })
}

switch (order.status) {
    case 'Processing':
        order.status = 'Shipped';
        break;
     case 'Shipped':
            order.status = 'Delivered';
            break;
    default:
        order.status = 'Delivered';
        break;
}
  await order.save()

  return res.status(200).json({
    success:true,
    message:"Order Processed Successfully",
})
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}



const deleteOrder = async(req, res, next )=>{
    const {id} = req.params;
  
    try {
const order = await Order.findById(id)
if(!order){
    return res.status(404).json({
        success:false,
        message:"Order Not Found",
    })
}


  await order.deleteOne()

  return res.status(200).json({
    success:true,
    message:"Order Deleted Successfully",
})
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
}


module.exports = {newOrder, myOrder, allOrders, getSingleOrder, proccessOrder, deleteOrder}