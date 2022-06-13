const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
require('dotenv').config()
// @desc register user
// access Public
// route POST /api/users
const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body
   
    if(!name || !email || !password){
        res.status(400)
        res.json({message: "Please input all fields"})
    }
    //check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("user already exists")
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        
    })
    if(user){
        res.status(201)
        res.json({
            _id: user.id,
            email: user.email,
            password: user.password,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid input fields')
    }

    res.json(user)
})


// @desc authenticate user
// access Public
// router POST /api/users/login
const loginUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler(async (req, res) =>{
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        _id,
        name,
        email
    })

})

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })

}

module.exports = {
    registerUser,
    loginUser,
    getMe
}