const userModel = require("../models/user.model");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token ){
        return res.status(401).json({Message : "Access Denied , No Token Provided"})


    }

    const isBlacklisted = await userModel.findOne({token : token })
    if(isBlacklisted){
        return res.status(401).json({Message : "Token is blacklisted , Please login again"})
    }
    
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = await userModel.findById(decoded._id)
        next()


    }catch(error){
        next(error)
        res.status(400).json({Message : "Invalid Token"})
    }

}