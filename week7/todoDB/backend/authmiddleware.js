const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ilovemannat";


function  auth (req, res, next){
  // send that token into header
  const token = req.headers.token;
  if(!token){
    res.json({
      msg:"token is missing please Signin your account"
    })
  }
  const decodeInfo = jwt.verify(token, JWT_SECRET)
  const id = decodeInfo.id;
  
  if(id){
    req.userId = id;
    next();
  }else{
    res.status(404).json({
      msg:"invailed token"
    })
  }
}

module.exports ={
  auth,
  JWT_SECRET
}