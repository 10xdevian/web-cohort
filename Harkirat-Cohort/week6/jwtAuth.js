const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
JWT_SECRET = "iloveyou";

app.use(express.json());

let users = [];

app.post("/signup", function (req, res) {
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

app.post("/signin", function (req, res) {
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
      JWT_SECRET,
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

app.get("/me", function (req, res) {
  const token = req.headers.token;

  // decode the information and verify it
  const decodeInfo = jwt.verify(token, JWT_SECRET);
  //
  // const unAuthDecodeInfo = jwt.decode(token);

  //
  const username = decodeInfo.username;

  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username) {
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
