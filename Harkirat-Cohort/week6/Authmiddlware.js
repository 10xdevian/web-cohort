const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
JWT_SECRET = "iloveyou";

app.use(express.json());

function logMiddleware(req, res, next) {
  console.log(req.method);
  next();
}

let users = [];

app.post("/signup", logMiddleware, function (req, res) {
  // console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "User Signup sucessfully",
  });
  console.log(users);
});

app.post("/signin", logMiddleware, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      foundUser = users[i];
    }
  }

  if (foundUser) {
    // we convert the username that pass into sign({ object }) into token using jwt secret key
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    // foundUser.token = token;  // this line of code store the token into varible
    res.json({
      token: token,
    });
  } else {
    res.status(404).json({
      msg: "invailed username and password",
    });
  }
});

const auth = (req, res, next) => {
  const token = req.headers.token;
  const decodeInfo = jwt.verify(token, JWT_SECRET);
  const username = decodeInfo.username; 
  if (username) {
    req.username = username; // this is how we paas the data from middleware to the routes
    next();
  } else {
    res.json({
      msg: "You are not login ",
    });
  }
};

app.get("/me", auth, logMiddleware, function (req, res) {
  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == req.username) {
      foundUser = users[i];
    }
  }

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.status(404).json({
      message: "token invalid",
    });
  }
});

app.listen(3000);
