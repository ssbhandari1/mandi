const  express = require("express");
const { addToCart, getProductLength, getAddProduct, deleteCartProduct, hadleCartQuantity } = require("../controller/addToCart.js");
const app = express.Router();

//route - /api/v1/addToCart/cart
app.post('/cart', addToCart)

//route - /api/v1/addToCart/product
app.get('/product', getAddProduct)

//route - /api/v1/addToCart/deleteProduct
app.delete('/deleteProduct', deleteCartProduct)

//route - /api/v1/addToCart/cartQuantity
app.put('/cartQuantity', hadleCartQuantity)

//route - /api/v1/addToCart/userProduct
app.get('/userProduct', getProductLength)

module.exports=app