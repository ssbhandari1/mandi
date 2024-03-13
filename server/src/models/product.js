const  mongoose = require("mongoose");

const schema = new mongoose.Schema({

    title:{
        type:String,
        required:[true, "Please enter Name"],
    },
    photo:{
        type:String,
        required:[true, "Please enter photo"],
    },
    price:{
        type:String,
        required:[true, "Please enter Price"],
    },
    stock:{
        type:String,
        required:[true, "Please enter stock"],
    },
    category:{
        type:String,
        required:[true, "Please enter category"],
        trim:true,
    },
 
},
{
    timestamps:true,
}
);
const Product = mongoose.model('Product',schema)

module.exports = Product