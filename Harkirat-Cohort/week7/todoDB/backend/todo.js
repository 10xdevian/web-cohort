const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {UserModel , TodoModel} = require("./Schema")
const {auth,JWT_SECRET} = require("./authmiddleware")
const app = express();



app.use(express.json());

mongoose.connect("mongodb+srv://vikramkrgupta01:h0yAEui6if70hpev@cohort02.qhche5y.mongodb.net/mernTodo");

app.post("/signup", async function(req, res){
  const { name, username,email, password } = req.body;
  await UserModel.create({
    name,
    username,
    email,
    password
  })
  res.json({
    msg:"User Signup sucessfull!!!"
  })
    
})

app.post("/signin", async function(req, res){
  const { username, password } = req.body;
  const findUser = await UserModel.findOne({
   username,
   password
  })
  if(findUser){
    const token = jwt.sign({
      id: findUser._id.toString()  // because id is present in db as object so we need to convert into string
    }, JWT_SECRET)
    res.status(200).json({
      msg:"Signin Sucessfuly",
      token,
    })
  }else{
    res.status(403).json({
      msg:"invailed credesials"
    })
  }
})

app.post("/todo",auth, async function(req, res){
  const userId = req.userId;
  
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

app.delete("/todo" ,auth, async function(req, res){
  const findTodo = await TodoModel.findById(req.params.id)
  if(!findTodo){
    res.json({
      msg:"todo not found"
    })
  }
  
  console.log(findTodo)
  await findTodo.remove();
  res.json({
    msg:"todo is deleted"
  })
})

app.listen(3000);