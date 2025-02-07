const express = require("express");
const app = express();

const users = [
  {
    name: "jhon",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.use(express.json());

app.get("/", function (req, res) {
  const jhonKidney = users[0].kidneys;
  const numberOfKidenys = jhonKidney.length;
  let numberOfHealthyKidenys = 0;
  for (let i = 0; i < jhonKidney.length; i++) {
    if (jhonKidney[i].healthy) {
      numberOfHealthyKidenys = numberOfHealthyKidenys + 1;
    }
  }
  const numberOfUnhealthyKidneys = numberOfKidenys - numberOfHealthyKidenys;
  res.json({
    numberOfKidenys,
    numberOfHealthyKidenys,
    numberOfUnhealthyKidneys,
  });
});

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!!",
  });
});

app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({
    msg: "Unhealthy Kidenys is Replaced...So now you are Fine",
  });
});

app.delete("/", function (req, res) {
  if (isAtleastOneUnhealthyKidneys()) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = newKidneys;
    res.json({
      msg: "UnHealthy Kidenys is Removed so you are safe now ",
    });
  } else {
    res.status(403).json({
      msg: "You dont have any Bad Kidney!! Cants Remove your Kidneys so You are Healthy 😊",
    });
  }
});

function isAtleastOneUnhealthyKidneys() {
  let atLeastOneUnHealthyKidneys = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atLeastOneUnHealthyKidneys = true;
    }
  }
  return atLeastOneUnHealthyKidneys;
}
app.listen(3000);
