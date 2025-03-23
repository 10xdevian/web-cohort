const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config")
function adminMiddleware (req, res, next){
  const token = req.headers.token;
  if(!token){
    return res.status(400).json({
      msg:"token is requires"
    })
  }
  const decodeData = jwt.verify(token, JWT_ADMIN_PASSWORD);
  if(decodeData){
    req.userId = decodeData.id;
    next();
  }else{
    res.status(403).json({
      msg:"You are not signed in"
    })
  }
}

module.exports={
  adminMiddleware
}