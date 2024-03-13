const  mongoose = require("mongoose");

const schema = new mongoose.Schema({

    quantity:{
        type:Number,
        default:1,
    },
    productId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }

 
},
{
    timestamps:true,
}
);
const AddToCart = mongoose.model('AddToCart',schema)

module.exports = AddToCart