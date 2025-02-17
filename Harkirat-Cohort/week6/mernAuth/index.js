const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRECT = "iloveyoubaby";
const app = express();

app.use(express.json());

const users = [];

// this is how we are exposing out html file on the localhost:3000/
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

  res.status(200).json({
    Message: `${username} signup sucessfull`,
  });
  //   console.log(users[0]);
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
  if (!foundUser) {
    res.json({
      message: "username and password is incorrect",
    });
  } else {
    // generate the token  sign take 2 argument 1st is the object that you want to encode and another is secrect code
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRECT,
    );

    res.header("jwt", token);

    res.json({
      token: token,
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;
  const decodeInfo = jwt.verify(token, JWT_SECRECT);
  const username = decodeInfo.username;
  if (username) {
    req.username = username;
    next();
  } else {
    res.json({
      msg: "You are not login",
    });
  }
}

app.get("/me", auth, function (req, res) {
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
    res.json({
      msg: " is invailed yes ok yes tell me what are yu saying ",
    });
  }
});

app.listen(3000);
