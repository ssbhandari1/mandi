const  User  = require('../models/user.js');
const bcrypt=require('bcrypt')

 const newUser = async (req, res, next) => {
  try {
    const { username, email, gender, password, photo, country, city,  } = req.body;
    const existingUser = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email Already Exists',
      });
    }

    // Create a new user
    await User.create({
      username,
      email,
      gender,
      password : hashedPassword,
      photo,
      country,
      city
    });

    return res.status(201).json({
      success: true,
      message: `You'r Register Successfully`,
    });
  } catch (error) {
    console.error('Error creating user:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};



const logInUser = async(req, res, next) => {
  const { email, password} = req.body;
  try {
    const user = await User.findOne({ email })
    if(!user){
      return res.status(409).json({
        success: false,
        message: 'Email or Password Incorrect',
      });
}
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  return res.status(409).json({
    success: false,
    message: 'Email or Password Incorrect',
  });
}
return res.status(201).json({
  success: true,
  message: `Log in successful`,
  userId: user._id
});

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
     
}


const getAllUser=async(req, res, next)=>{
  try {
    const users = await User.find({});

    return res.status(201).json({
      success:true,
      users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }

}
const getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};


const deleteUser=async(req, res, next)=>{

  try {
    const id = req.params.id;
const user = await User.findById(id);

if(!user){
 return res.status(500).json({
    success: false,
    message: 'Invalid  Id',
  });
}
await user.deleteOne();
return res.status(200).json({
  success : true,
 message:"User Deleted Successfully"
})
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }


}


const updateUserInfo=async(req, res, next)=>{
  const {userId, username, email, gender, password, country, phone } = req.body;
const  photo  = req.file;
console.log('photo',photo)
  try {
   
    if (!userId) 
    {
     return res.status(404).json({
         success: false,
         message: "Bad request ",
     });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
 await User.findOneAndUpdate(
  { _id : userId },
  {$set: {
     username: username,
     email: email,
     gender: gender,
     password : hashedPassword ,
     photo: photo?.path,
     country: country,
     phone: phone
  }},
  { new: true}
 )

return res.status(200).json({
  success : true,
 message:"User updated Successfully"
})
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }


}


module.exports = {newUser, getAllUser, getUser, deleteUser, logInUser, updateUserInfo}
