const express = require("express");
const app = express();

let count = 0;

app.get("/", function (req, res) {
  count = count + 1;
  res.send("Hy there!!!!!!!");
});
app.get("/request", function (req, res) {
  res.json({ requestCount: `${count}` });
});

app.listen(3000);
