const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRECT = "iloveyou";
const app = express();

app.use(express.json());

const users = [];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", function (req, res) {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  users.push({
    name: name,
    username: username,
    email: email,
    phone: phone,
    password: password,
  });

  res.status(200).json({
    Message: `${name} signup sucessfull`,
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
        username: users[i].username,
      },
      JWT_SECRECT
    );
    res.header("jwt", token);

    res.json({
      token: token,
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_SECRECT);
  const username = decoded.username;
  if (username) {
    req.username = username;
    next();
  } else {
    res.json({
      msg: "You are not login",
    });
  }
}

app.get("/me", auth, function (req, res) {});

app.listen(3000);
