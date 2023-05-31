const express = require('express');
const {
    createUser,
    loginUser,
    getUser,
    updateUser
} = require('../Controllers/UserController')


const router = express.Router();

//signup
router.post('/signup',createUser);

//login
router.post('/login',loginUser);

//profile
router.get('/',getUser);

//update profile
router.put('/update',updateUser);


module.exports = router;