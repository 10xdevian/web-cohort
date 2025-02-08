const express = require("express");
const app = express();

app.get("/", function (req, res) {
  console.log(req.hostname);
  console.log(req.url);
  console.log(req.method);
  console.log(req.date);
  console.log(req.timestamp);
  console.log(new Date());
  res.json({
    message: "work is done I print all of this URL , Method , date , timeStamp",
  });
});

app.listen(3000);
