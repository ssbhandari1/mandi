const  express = require("express");
const adminOnly =require('../middlewares/auth.js');
const { newOrder, myOrder, allOrders, getSingleOrder, proccessOrder, deleteOrder } = require("../controller/order.js");
const app = express.Router();

//route - /api/v1/order/new
app.post('/new', newOrder)

//route - /api/v1/order/my
app.get('/my', myOrder)


//route - /api/v1/order/all
app.get('/all', adminOnly, allOrders)


app.route('/:id').get(getSingleOrder).put(adminOnly,proccessOrder).delete(adminOnly,deleteOrder)

module.exports=app