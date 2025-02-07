const express = require("express");
const app = express();

app.use(express.json());

// this is how we send our frontend and backend on same localHost
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/sum", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;

  res.json({ message: `ans = ${a + b}` });
});
app.listen(3000);
