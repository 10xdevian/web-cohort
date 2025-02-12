const express = require("express");
const app = express();

app.use(express.json()); // without this we cant get body

let users = [];

function generateToken() {
  const token = null;
}

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });
  res.json({
    message: "User Sucessfully Signup",
  });
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // now we need to find the user is exists or not]
  const foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      foundUser = users[i];
    } else {
      res.json({
        message: "User does not exixts ",
      });
    }
  }

  if (foundUser) {
    const token = generateToken();
    foundUser.token = token;
    res.status(200).json({
      message: token,
    });
  } else {
    res.status(404).json({
      message: "User not found ",
    });
  }
});

// send the token in the header
// check is that token is available in users[i] or not if exixtes then return the that found user details
//
app.get("/me", function (req, res) {
  const token = req.headers.token;

  let findUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].token == token) {
      findUser = users[i];
    }
  }
  if (findUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: "invailed token",
    });
  }
});
app.listen(3000);
