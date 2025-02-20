const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const cors = require("cors");
const {UserModel , TodoModel} = require("./Schema")
const {auth,JWT_SECRET} = require("./authmiddleware")
const app = express();


app.use(cors())
app.use(express.json());

mongoose.connect("mongodb+srv://vikramkrgupta01:h0yAEui6if70hpev@cohort02.qhche5y.mongodb.net/mernTodo");

app.post("/signup", async function(req, res){
  
  // input vailidation 
  const requireBody= z.object({
    fullname: z.string()
      .trim()
      .regex(/^[A-Za-z]+ [A-Za-z]+$/, "Please enter a valid first and last name (e.g., 'John Doe')"),
      
    username:z.string()
      .min(5)
      .max(10),
    email:z
      .string()
      .email({message:"Invailed Emial"}),
    password :z
      .string()
      .min(8,"the password must be 5 character long")
      .max(20,"the password must be maximum 20 character"),
  })
  
  const parseDataWithSucess = requireBody.safeParse(req.body)
  if(!parseDataWithSucess.success){
    res.json({
      msg:"Incorrect format",
      error:parseDataWithSucess.error,
    })
  }
  
  const { fullname, username,email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10)

  await UserModel.create({
    fullname,
    username,
    email,
   password: hashPassword
  })
  
  res.json({
    msg:"User Signup sucessfull!!!"
  })
    
})

app.post("/signin", async function(req, res){
  
  const requestBody = z.object({
    username : z.string().min(5).max(10),
    password:z.string().min(8,"Password must be at least 8 character ").max(20, "Password must be maximum 20 character"),
  })
  
  const parseDataWithSucess = requestBody.safeParse(req.body);
  
  if(!parseDataWithSucess.success){
    res.json({
      msg:"Incorerct Format",
      error:parseDataWithSucess.error
    })
  }
  const { username, password } = req.body;
  
  
  const findUser = await UserModel.findOne({username});
  if(!findUser){
   return res.json({
      msg:"username is incorrect"
    })
  }
  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword){
    return res.json({
      msg:"Password is incorrect"
    })
  }
  
    const token = jwt.sign({
      id: findUser._id.toString()  // because id is present in db as object so we need to convert into string
    }, JWT_SECRET)
    res.status(200).json({
      msg:"Signin Sucessfuly",
      token,
    })
})

app.post("/todo",auth, async function(req, res){
  const userId = req.userId;
  
  const requestBody = z.object({
    title:z.string(),
    description:z.string(),
    done:z.boolean(),
  })
  
  const parseDataWithSucess = requestBody.safeParse(req.body);
  
  if(!parseDataWithSucess.success){
    res.json({
      msg:"Incorrect Format",
      error:parseDataWithSucess.error,
    })
  }
  
  const { title, description, done } = req.body;
  await TodoModel.create({
    title,
    description,
    done,
    userId,
  })
  res.status(200).json({
    msg:"Todo is Added!!"
  })
})

app.get("/todo",auth, async function(req, res){
  const userId = req.userId;
  const todos = await TodoModel.find({
    userId
  })
  res.json({
    todos
  })
})


app.put("/todo/:id/done", auth, async function(req, res){
  const todoId = req.params.id;
  const userId = req.userId;
  
  try{
    // find and update the todo if that todo belong to loged user
    const updateTodo = await TodoModel.findOneAndUpdate(
      { _id: todoId, userId: userId },
      { done: true },
      { new: true },
    );
    if(!updateTodo){
      return res.json({
        msg:"Todo not found or not authorized"
      })
    }
    res.json({
      msg:"Todo is Mark as Done"
    })
  }catch (error){
    res.status(500).json({
      msg:"Server Error",
      error:error.message
    })
  }
  
})

app.listen(3000);