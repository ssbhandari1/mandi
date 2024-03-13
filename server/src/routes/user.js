const  express = require("express");
const {newUser, getAllUser, getUser, deleteUser, logInUser, updateUserInfo}  = require("../controller/user.js");
const adminOnly =require('../middlewares/auth.js');
const singleUpload = require("../middlewares/multer.js");
const app = express.Router();

//route - /api/v1/user/new
app.post('/new',newUser);

//route - /api/v1/user/logIn
app.post('/logIn',logInUser);

//route - /api/v1/user/all
app.get('/all',adminOnly, getAllUser)

//route - /api/v1/user/updateUser
app.patch('/updateUser',singleUpload, updateUserInfo)

//route - /api/v1/user/dynamicID
app.route('/:id').get(getUser).delete(adminOnly, deleteUser)

module.exports=app
