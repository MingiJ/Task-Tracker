const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from the header
            token = req.headers.authorization.split(' ')[1]

            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //fetch user from the database without password
            req.user = await User.findById(decoded.id).select('-password')
            next()

            //error handling: if user is not authorized or no token has been passed
            
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
            
        }

    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = protect