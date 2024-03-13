const  express = require("express");
const {newProduct, getLatestProducts, getAllCategory, getAdminProduct, getSingleProduct, updateProduct, deleteProduct, searchAllProducts, addProduct} = require("../controller/products");
const singleUpload = require("../middlewares/multer");
const adminOnly = require("../middlewares/auth");

const app = express.Router();

//api/v1/product/latest
app.post('/new',adminOnly, singleUpload, newProduct)

app.get('/latest',getLatestProducts)

app.get('/all',searchAllProducts)

app.get('/category',getAllCategory)

app.put('/addProduct',addProduct)


app.get('/admin-products',adminOnly, getAdminProduct)

app.route('/:id').get(getSingleProduct).put(adminOnly, singleUpload, updateProduct).delete(adminOnly, deleteProduct)

module.exports=app
