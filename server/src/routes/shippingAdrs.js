const  express = require("express");
const { createShippingAdrs, existingAddress, updateShippingAdrs } = require("../controller/shippingAdrs");
const app = express.Router();

// route - /api/v1/shippingAdrs/new
app.post('/new', createShippingAdrs)

//route - /api/v1/shippingAdrs/existingAddress
app.get('/existingAddress', existingAddress)

//route - /api/v1/shippingAdrs/updateAdrs
app.patch('/updateAdrs', updateShippingAdrs)
module.exports= app
