const   mongoose  = require("mongoose")

const schema = new mongoose.Schema(
    {
        shippingInfo: {
                address: {
                    type:String,
                    required: true,
                },
                city: {
                    type:String,
                    required: true,
                },
                state: {
                    type:String,
                    required: true,
                },
                country: {
                    type:String,
                    required: true,
                },
                pinCode: {
                    type:String,
                    required: true,
                },
                user: {
                    type:String,
                    required :true,
                   },
                phone: {
                    type:String,
                    required :true,
                   },
                alterNativePhone: {
                    type:String,
                   },
               },
               userId: {
                type: mongoose.Types.ObjectId,
                ref:'User',
               },
},
{
    timestamps:true,
}
)

const Address = mongoose.model('Address', schema)

module.exports = Address;
