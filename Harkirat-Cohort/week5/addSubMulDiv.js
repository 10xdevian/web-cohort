const express = require("express");
const app = express();

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}

app.get("/add", function (req, res) {
  const a = parseFloat(req.query.a); // we cant send number as a quesry if its not converted
  const b = parseFloat(req.query.b);

  const ans = add(a, b);
  res.status(200).json({ result: ans });
});

app.get("/div", function (req, res) {
  const a = parseFloat(req.query.a); // we cant send number as a quesry if its not converted
  const b = parseFloat(req.query.b);

  const ans = div(a, b);
  res.status(200).json({ result: ans });
});

app.get("/sub", function (req, res) {
  const a = parseFloat(req.query.a); // we cant send number as a quesry if its not converted
  const b = parseFloat(req.query.b);

  const ans = sub(a, b);
  res.status(200).json({ result: ans });
});

app.get("/mul", function (req, res) {
  const a = parseFloat(req.query.a); // we cant send number as a quesry if its not converted
  const b = parseFloat(req.query.b);

  const ans = mul(a, b);
  res.status(200).json({ result: ans });
});

app.listen(3000);
