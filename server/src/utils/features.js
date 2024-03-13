const mongoose = require("mongoose");
const Product = require("../models/product");
 const connectDB = async () => {
  try {

    await mongoose.connect('mongodb://127.0.0.1:27017/mandies', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
 

const reduceStock = async (orderItems) =>{
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if(!product){
      return res.status(400).json({
        success:false,
        message:"Product Not Found",
    })
    }
    product.stock -= order.quantity;
    await product.save();
    
  }
}

module.exports = {connectDB, reduceStock}
