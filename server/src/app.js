require('dotenv').config();
const cors=require('cors')
const express=require('express')
const morgan = require('morgan')
const {connectDB}  = require("./utils/features.js");
const  userRoutes = require("./routes/user.js");
const  productRoutes = require("./routes/product.js");
const  orderRoutes = require("./routes/order.js");
const  paymentRoutes = require("./routes/payment.js");
const  addToCartRoutes = require("./routes/addToCart.js");
const  addressRoutes = require("./routes/shippingAdrs.js");


const port = 8080;

connectDB()
const app=express()
console.log(port)
app.use(cors())

app.use(express.json());
app.use(morgan('dev'))

//Using Routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/payment', paymentRoutes)
app.use('/api/v1/addToCart', addToCartRoutes)
app.use('/api/v1/shippingAdrs', addressRoutes)


app.use('/uploads', express.static('uploads'))

app.listen(port,()=>{
    console.log(`Server is working ${port}`)
})