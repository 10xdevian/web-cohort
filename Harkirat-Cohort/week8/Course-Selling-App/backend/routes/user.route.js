
const { Router } = require("express");
const userRouter = Router();


userRouter.get("/signup", (req , res)=>{
 res.json({
   msg:"Signup what  y endpoint"
 })
})

userRouter.get("/signin", (req , res)=>{
 res.json({
   msg:"signin endpoint"
 })
})


userRouter.get("/purchased", (req , res)=>{
 res.json({
   msg:"purchased courses endpoint"
 })
})


module.exports={
  userRouter
}