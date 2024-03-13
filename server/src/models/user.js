const  mongoose = require("mongoose");
const  validator =require("validator");

const schema = new mongoose.Schema({

    username:{
        type:String,
        required:[true, "Please enter Name"],
    },
    email:{
        type:String,
        unique:[true, "Email alread Exist"],
        required:[true, "Please enter Name"],
        validate:validator.default.isEmail,
    },

    photo: {
        type: String,
    //    required: [true , "Please add Photo"],
       
    },
    role: {
        type: String,
        enum:['admin','user'],
        default:'user',
    },
    gender: {
        type: String,
        enum:['male','female'],
       required: [true , "Please add your Gender"],
    },
    password:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        // required:true,
    },
    phone:{
        type:String,
        // required:true,
    },
    city:{
        type:String,
        // required:true,
    }
 
},
{
    timestamps:true,
}
);
const User = mongoose.model('User',schema)

module.exports = User