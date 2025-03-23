const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;
const dbConnect = require("./db");



const app = express();
app.use(express.json());


// app.use('/api/user' , userRouter);
app.use('api/auth', authRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is listing on the port ${PORT}`);
  dbConnect();
});
