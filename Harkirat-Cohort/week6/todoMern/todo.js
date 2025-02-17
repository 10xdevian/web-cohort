const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRECT = "iloveyouyes";
const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/todo.html");
});

let users = [];

app.post("/signup", function (req, res) {
  const { name, username, password } = req.body;
  users.push({
    name,
    username,
    password,
  });
  res.json({
    msg: "you are signup",
  });
  console.log(users[0]);
  //   console.log(users[1]);
});

app.post("/signin" , function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  
  
  let foundeUser = null;
  for (let i = 0; i < users.length;i++){
    if(users[i].username == username && users[i].password == password){
      foundeUser=users[i]
    }
  }
  
  if(foundeUser){
    const token = jwt.sign({
      username:username
    }, JWT_SECRECT)
    res.header("jwt", token);
    
    res.json({
      msg:"User signin is sucessfull ",
      token:token,
    })
   console.log("token"+token) 
  }else{
    res.json({
      msg:"username and password is incorrect"
    })
  }
  
})

function auth (req, res , next){
  const token = req.headers.token;
  
  if(!token){
    res.status(404).json({
      msg:"token is missing please Signin your account"
    })
  }
  const decodeInfo = jwt.verify(token, JWT_SECRECT)
  const username = decodeInfo.username;
  
if(username){
  req.username = username
  next();
}else{
  res.json({
    msg:"token is invailed and you are not signin"
  })
}
}
const todos = [];
app.post("/create",auth, function(req , res){
  const title = req.body.title;
  const description = req.body.description;
  todos.push({
    title:title,
    description:description
  })
  res.json({
    msg:"todo is created "
  })
  
})

app.get("/todos", auth ,function(req, res){
    res.json({
      todos:todos 
    })
})

app.listen(3000);
