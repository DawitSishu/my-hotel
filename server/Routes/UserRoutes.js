const express = require('express');
const {
    createUser,
    loginUser,
    getUser,
    updateUser,
} = require('../Controllers/UserController');
const userAuthChecker = require('../Middlewares/userAuthChecker')


const router = express.Router();

//signup
router.post('/signup',createUser);

//login
router.post('/login',loginUser);

//user-profile
router.get('/',userAuthChecker,getUser);

//update profile
router.put('/update',userAuthChecker,updateUser);


module.exports = router;