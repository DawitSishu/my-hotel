const express = require('express');
const {
    createUser,
    loginUser,
    getUser,
    updateUser,
    userProfile
} = require('../Controllers/UserController')


const router = express.Router();

//signup
router.post('/signup',createUser);

//login
router.post('/login',loginUser);

//users
router.get('/',getUser);

//profile
router.get('/profile/:id',userProfile)

//update profile
router.put('/update/:id',updateUser);


module.exports = router;