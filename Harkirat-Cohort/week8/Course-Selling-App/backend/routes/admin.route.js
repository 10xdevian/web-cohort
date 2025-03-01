const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = require("../config")
const adminModel = require("../schema/Admin.schema")
const { adminSignupSchema  , adminSigninSchema} = require("../vailidator/adminValidator");
const { adminMiddleware } = require("../middleware/adminMiddleware");
const { courseSchema } = require("../vailidator/coursesValidator");
const { courseModel } = require("../schema/Course.schema");
const adminRouter = Router();


adminRouter.post("/signup",  async (req , res)=>{
 try{
   // validate request body using zod 
   const vailidatedData = adminSignupSchema.parse(req.body);
   
   // conver the plan password to hashpassowrd 
   const hashPassword = await bcrypt.hash(vailidatedData.password, 10);
   
   // replace the plain passoword with haspassword 
   vailidatedData.password = hashPassword;
   // send vailideted data to the db
   await adminModel.create(vailidatedData);
   res.status(201).json({msg:"Signup Sucessfully"})
 }catch(error){
   if(error.name === "zodError"){
     res.status(400).json({
       msg: "Vailidation Error", error: error.errors
     });
     
   }
   console.error("Error during signup ", error);
   res.status(500).json({
     msg:"Internal Server Error"
   })
 }
})

adminRouter.post("/signin", async (req , res)=>{
  const vailidatedData = adminSigninSchema.safeParse(req.body)
  if(!vailidatedData.success){
    return res.status(400).json({
      msg:"Validation Error",
      errors:vailidatedData.error.errors
    })
  }
  try{
     // login to database 
     // find user 
    let findUser = await adminModel.findOne( {username : vailidatedData.data.username} );
     if(!findUser){
      return res.status(400).json({
         msg:"username incorrect"
       })
     }
    const comparePassword = bcrypt.compare(vailidatedData.data.password, findUser.password)
 if(!comparePassword){
   return res.status(400).json({
     msg:"Password is incorrect"
   })
 }
    const token = jwt.sign({
      id: findUser._id.toString(), 
    }, JWT_ADMIN_PASSWORD);
    res.status(200).json({
      msg:"Singin sucessfully ",
      token 
    })
  }catch(error){
    console.log("Error while login ", error)
    res.status(500).json({
      msg:"Internal Server Error Signup Failed"
    })
  }
})


adminRouter.post("/course", adminMiddleware,async (req , res)=> {
  const adminId = req.userId;
  
  const validatedCourseData = courseSchema.safeParse(req.body);
  
  if(!validatedCourseData.success){
    return res.status(400).json({
      msg:"Validation Error",
      error:validatedCourseData.error,
    })
  }
  
  try{
    await courseModel.create({
      ...validatedCourseData.data,
      createrId:adminId,
    })
    res.status(200).json({
      msg:"Course is Created"
    })
  }catch(error){
    console.log("error white creating course", error);
    res.status(500).json({
      msg:"Internal Server Error while Creating Courses"
    })
  }
} )


adminRouter.get("/courses",adminMiddleware ,async (req , res)=>{
  const adminId = req.userId;
  try{
    const courses = await courseModel.find({
      createrId:adminId,
    })
    res.status(200).json({
      courses
    })
  }catch(error){
    console.log("error while getting the course", error)
    res.status(500).json({
      msg:"Internal server error"
    })
  }
})


module.exports={
adminRouter
}