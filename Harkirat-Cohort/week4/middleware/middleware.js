const express = require("express");
const app = express();

app.use(express.json());

function isOldEnoughMiddleware(req, res, next) {
  const age = req.query.age;
  if (age >= 14) {
    next();
  } else {
    res.status(404).json({ message: "Your age is not enough to ride" });
  }
}

//app.use(isOldEnoughMiddleware); // below this line every routes have acess to this middleware

app.get("/ride1", isOldEnoughMiddleware, function (req, res) {
  res.status(200).json({ message: "you have sucessfully riden the ride1" });
});

app.get("/ride2", isOldEnoughMiddleware, function (req, res) {
  res.json({ message: "you have sucessfully riden the ride2" });
});

app.listen(3000);
