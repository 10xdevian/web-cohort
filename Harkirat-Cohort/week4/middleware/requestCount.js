const express = require("express");
const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable
//
let count = 0;
app.use(function (req, res, next) {
  count = count + 1;
  next();
});

app.get("/user", function (req, res) {
  res.status(200).json({ name: "Jhon" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "Created dubby user" });
});

app.get("/requestCount", function (req, res) {
  res.status(200).json({ count });
});

app.listen(3000);
