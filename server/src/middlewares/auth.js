const User = require("../models/user.js");

const adminOnly =async(req, res, next)=>{

    const { id } = req.query;
    if(!id) 
    return res.status(401).json({
        success : false,
       message:"Please login first"
      })

      const user =await User.findById(id)
      if(!user)
      return res.status(401).json({
        success : false,
       message:"This is Fake Id"
      })
      if(user.role !== 'admin')
      return res.status(401).json({
        success : false,
       message:"You'r not eligible for this"
      })
      next()

}

module.exports = adminOnly