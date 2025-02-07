// express.json() is a external middleware that use bodyPasser under the hood
const express = require("express");
const app = express();

app.use(express.json());
app.post("/", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;

  res.json({
    msg: `you send data correctly in post request using  body ans = ${a + b}`,
  });
});
app.listen(3000);
