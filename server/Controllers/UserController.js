const Users = require('./Users.js')


//@desc register a user
//@route POST /api/users/signup
//@access public
const createUser = (req,res) =>{
    const {email,password,name} = req.body;
    const existingUser = Users.filter(user=>user.email == email)
    if(existingUser.length > 0){
        res.status(400).json({msg:"user already exists"})
    }else{
        const newUser = {email,password,name,id:Users.length + 1};
        Users.push(newUser);
        res.json(newUser);
    }
}


//@desc sign-in a user
//@route POST /api/users/login
//@access public
const loginUser = (req,res) =>{
    const {email,password} = req.body;
    const user = Users.filter(user=>user.email == email)
    if(user.length == 0){
        res.status(400).json({msg:"incorrect email or password"});
    }else{
       if(user[0].password != password){
        res.status(400).json({msg:"incorrect email or password"});
       }else{
        res.json(user)
       }
    }
}



//@desc get all users
//@route GET /api/users/
//@access private
const getUser = (req,res) =>{
    res.json(Users);
}


//@desc update user profile
//@route PUT /api/users/update
//@access private
const updateUser = (req,res) =>{
    const id = parseInt(req.params.id);
    const updatedData = req.body;
  
    const userIndex = Users.findIndex((user) => user.id === id);
  
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    Users[userIndex] = { ...Users[userIndex], ...updatedData };
  
    return res.json(Users[userIndex]);

}

//@desc show user profile
//@route GET /api/users/update
//@access private
const userProfile = (req,res) =>{
    const user = Users.filter(user => user.id === Number(req.params.id))
    res.json(user)
}


module.exports = {
    createUser,
    loginUser,
    getUser,
    updateUser,
    userProfile
}