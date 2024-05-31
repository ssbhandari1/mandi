const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { rm } = require("fs");
const newUser = async (req, res, next) => {
  try {
    const { username, email, gender, password, photo, country, city, role } =
      req.body;
    const existingUser = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email Already Exists",
      });
    }

    // Create a new user
    await User.create({
      username,
      email,
      gender,
      password: hashedPassword,
      photo,
      country,
      city,
      role,
    });

    return res.status(201).json({
      success: true,
      message: `You'r Register Successfully`,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const logInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({
        success: false,
        message: "Email or Password Incorrect",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(409).json({
        success: false,
        message: "Email or Password Incorrect",
      });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "4m" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res
      .status(200)
      .json({ success: true, message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllUser = async (req, res, next) => {
  const role = req.params.user;
  try {
    const users = await User.find({ role });
    console.log(users);
    return res.status(201).json({
      success: true,
      users,
      message: "All user are here...",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Invalid  Id",
      });
    }
    await user.deleteOne();
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateUserInfo = async (req, res, next) => {
  const { userId, username, email, gender, password, country, phone } =
    req.body;
  const photo = req.file;
  console.log("jjj", photo);
  try {
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "Bad request ",
      });
    }
    // const user = await User.findById(userId);
    // if (photo) {
    //   rm(user.photo, () => {
    //     console.log("Old photo  Deleted");
    //   });
    // }
    // const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          username: username,
          email: email,
          gender: gender,
          password: password,
          photo: photo?.path,
          country: country,
          phone: phone,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "User updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  newUser,
  getAllUser,
  getUser,
  deleteUser,
  logInUser,
  updateUserInfo,
};

// // routes/authRoutes.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// // Registration Endpoint
// router.post('/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ username, email, password: hashedPassword });
//         await user.save();
//         res.status(201).send('User created successfully');
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// // Login Endpoint
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).send('User not found');

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).send('Invalid credentials');

//         // Generate JWT Tokens
//         const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
//         const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

//         res.json({ accessToken, refreshToken });
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// module.exports = router;

// // middleware/authenticateToken.js
// const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); // Invalid token
//         req.user = user;
//         next();
//     });
// }

// module.exports = authenticateToken;

// // routes/productRoutes.js
// const express = require('express');
// const authenticateToken = require('../middleware/authenticateToken');
// const router = express.Router();

// router.get('/products', authenticateToken, (req, res) => {
//     // Fetch and return products only if the request is authenticated
//     res.json({ message: "Protected products data" });
// });

// module.exports = router;

// // routes/authRoutes.js (Add this to your existing authRoutes)
// router.post('/token', (req, res) => {
//     const { refreshToken } = req.body;
//     if (refreshToken == null) return res.sendStatus(401);
//     // Verify the refresh token
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         const accessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
//         res.json({ accessToken });
//     });
// });
