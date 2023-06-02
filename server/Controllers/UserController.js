const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel.js'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//add jwt bcrypt mongoose implementation


//@desc register a user
//@route POST /api/users/signup
//@access public
const createUser = asyncHandler(async (req, res) => {
    const { email, password, name, age } = req.body;
  
    if (!email || !password || !name || !age) {
      res.status(400);
      throw new Error('All fields are required');
    }
  
    if (age < 18) {
      res.status(400);
      throw new Error('User must be at least 18 years old');
    }
  
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      res.status(400);
      throw new Error('User already exists');
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        age,
      });
  
      // Save the new user to the database
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    }
  });


//@desc sign-in a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400);
      throw new Error('All fields are required');
    }
  
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(401);
      throw new Error('Incorrect Email or Password');
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        res.status(401);
        throw new Error('Incorrect Email or Password');
      } else {
        const { password: omitPassword, ...userData } = user.toObject();

        const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: '1d' });
      res.json({
        token,
      });
      }
    }
  });


//@desc get all users
//@route GET /api/users/
//@access private
const getUser = asyncHandler( async (req,res) =>{
    res.json(req.user);
})


//@desc update user profile
//@route PUT /api/users/update
//@access private
const updateUser =asyncHandler( async  (req,res) =>{
    const user = req.user;
    const { name, email, age } = req.body;

    // Check if any required fields are missing
    if (!name && !email && !age) {
      res.status(400);
      throw new Error('At least one field (name, email, or age) is required');
    }

    // Update the user's profile
    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  })




module.exports = {
    createUser,
    loginUser,
    getUser,
    updateUser,
}