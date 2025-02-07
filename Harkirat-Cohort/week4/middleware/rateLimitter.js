const express = require("express");
const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let noOfRequestForUser = {};
setInterval(() => {
  noOfRequestForUser = {};
}, 1000);

app.use(function (req, res, nexr) {
  const userId = req.headers["user-id"];
  if (noOfRequestForUser[userId]) {
    noOfRequestForUser[userId]++;
    if (noOfRequestForUser > 5) {
      res.status(404).json({
        msg: "user is blocked he is sending morethan 5 req per second ",
      });
    } else {
      next();
    }
  } else {
    noOfRequestForUser[userId] = 1;
    next();
  }
});
app.get("", function (req, res) {});

app.listen(3000);
