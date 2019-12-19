const express = require('express');
const bcrypt = require("bcryptjs")
const db = require('./usersModel')
const jwt = require("jsonwebtoken")
const secret = require("./secrets")
const router = express.Router();


module.exports = (req,res,next) => {
const token = req.headers.authorization
    if (token){
jwt.verify(token,secret.jwtSecret,(err,decodedToken) => {
  if(err){
    res.status(400).json({message:"you shall not pass"})
  }
  else{
    req.decodedJwt = decodedToken
    next()
  }
})
    }
    else {
      res.status(400).json({message:"token doesn't exist"})
    }

}