const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./db");

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is listing on the port ${process.env.PORT}`);
  dbConnect();
});
