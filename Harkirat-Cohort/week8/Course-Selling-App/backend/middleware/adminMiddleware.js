const jwt = require("jsonwebtoken");

function adminMiddleware (req, res, next){
  const token = req.headers.token;
  if(!token){
    return res.status(400).json({
      msg:"token is requires"
    })
  }
  const decodeData = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD);
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