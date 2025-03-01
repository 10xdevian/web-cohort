const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Router } = require("express");
const { userSignupSchema, userSigninSchema } = require("../vailidator/userValidator");
const {JWT_USER_PASSWORD} = require("../config")
const userModel = require("../schema/User.Schema");
const userRouter = Router();


userRouter.post("/signup",async (req , res)=>{
  const validatedUserData = userSignupSchema.safeParse(req.body);
  
  if(!validatedUserData.success){
    return res.status(400).json({
      msg:"Validation Failed",
      error:validatedUserData.error,
    })
  }
  
  try{
    const hashPassword =await bcrypt.hash(validatedUserData.data.password, 10);
    validatedUserData.data.password = hashPassword;
    
    await userModel.create({
      ...validatedUserData.data
    });
    res.status(201).json({
      msg:"User Signup Sucess"
    })
  }catch(error){
    console.log("Error while user Signup ", error)
    res.json({
      msg:"Internal Server error while user Signup"
    })
  }
})

userRouter.post("/signin",async (req , res)=>{
  const validatedUserData = userSigninSchema.safeParse(req.body);
  
  if(!validatedUserData.success){
    return res.status(400).json({
      msg:"User signin vailidation failied",
      error: validatedUserData.error,
    })
  }
  
  try{
    let foundUser = await userModel.findOne({ username: validatedUserData.data.username });

    if(!foundUser){
      return res.status(400).json({
        msg:"Username incorrect"
      })
    }
    
    const comparePassword =  bcrypt.compare(validatedUserData.data.password, foundUser.password)
    if(!comparePassword){
      return res.status(400).json({
        msg:"Password is incorrect"
      })
    }
    
    const token = jwt.sign({
      id: foundUser._id
    }, JWT_USER_PASSWORD);
    res.status(200).json({
      msg:'user Signin sucessfully',
      token
    })
  }catch(error){
    console.log("Error while Sign in User ", error),
    res.status(500).json({
      msg:"Internal Server error while User Signin"
    })
  }
 
})


userRouter.get("/purchased", (req , res)=>{
 res.json({
   msg:"purchased courses endpoint"
 })
})


module.exports={
  userRouter
}