const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");

async function regsiterUser(req, res) {
const{username,email,password,role="user"}= req.body;
const isuserAlreadyExist = await userModel.findOne({
    $or: [
        {username},
        {email}
    ]
});
if(isuserAlreadyExist) {
    return res.status(409).json({
        message:"user already exist"
        
    })
}
const hash = await bcrypt.hash(password,10)
const user = await userModel.create({
    username,
    email,
    password:hash,
    role,
})

const token = jwt.sign({
    id:user._id,
    role:user.role
},process.env.JWT_SECRET)

res.cookie("token",token)
 res.status(201).json({
    message:"user regsitred succesfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role
    }
})
}

async function loginUser(req,res) {
  const {username,email,password} = req.body;
  

  
const user = await userModel.findOne({
    $or:[
        {
            username

        },
        {
            email
        }
    ]
    

})

    if(!user){
        return res.status(401).json({
            message:"invalid login credenatials"
        })
    }
    const ispassValid = await bcrypt.compare(password,user.password);
    
    if(! ispassValid){
        return res.status(401).json({
            message:"invalid login credenatials"
        })
    }
    
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)
    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
    res.status(200).json({
        message:"user logged succefully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
   
}

async function logoutUser(req,res){
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
});
    res.status(200).json({
        message:"user logout succesfully"
    })
}

module.exports = { regsiterUser, loginUser , logoutUser };