const fs = require("fs");

fs.readFile("a.txt", function (error, data) {
  console.log(data);
});
