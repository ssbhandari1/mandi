const  mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        shippingInfo: {
            address: {
                type:String,
                required: true,
            },
            city: {
                type:String,
                required: true,
            },
            state: {
                type:String,
                required: true,
            },
            country: {
                type:String,
                required: true,
            },
            pinCode: {
                type:String,
                required: true,
            },
            user: {
                type:String,
                required :true,
               },
            phone: {
                type:String,
                required :true,
               },
            alterNativePhone: {
                type:String,
               },
           },
   totalQuantity: {
    type:String,
    required: true
   },
   discount: {
    type:String,
    required: true
   },
   paymentStatus: {
    type:String,
    required: true
   },
   subtotal: {
    type:String,
    required: true
   },
   shippingCharges: {
    type:String,
    required: true
   },
   tax: {
    type:String,
    required: true
   },
   userId: {
    type: mongoose.Types.ObjectId,
    ref:'User',
   },
   status: {
    type: String,
   enum:["Processing", "Shipped", "Delivered"],
   default: 'Processing'
   },
   orderItems: [
    {
        name:String,
        photo:String,
        price:Number,
        quantity:Number,
        productId: {
            type: mongoose.Types.ObjectId,
            ref:'Product',
        }
    }
   ]

},
{
    timestamps:true,
}
);
const Order = mongoose.model('Order',schema)

module.exports = Order