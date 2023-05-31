

//@desc register a user
//@route POST /api/users/signup
//@access public
const createUser = (req,res) =>{
    res.json("signup");
}


//@desc sign-in a user
//@route POST /api/users/login
//@access public
const loginUser = (req,res) =>{
    res.json("login");
}



//@desc get  user profile
//@route GET /api/users/
//@access private
const getUser = (req,res) =>{
    res.json("user-info");
}


//@desc update user profile
//@route PUT /api/users/update
//@access private
const updateUser = (req,res) =>{
    res.json("profile-update");
}


module.exports = {
    createUser,
    loginUser,
    getUser,
    updateUser
}