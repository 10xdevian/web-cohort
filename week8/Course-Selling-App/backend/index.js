const dotenv = require("dotenv");
dotenv.config();
const Express = require("express");
const app = Express();
const {port} = require("./config")
const connectToDB= require("./db")

app.use(Express.json());

const { userRouter } = require("./routes/user.route");
const { adminRouter } = require("./routes/admin.route");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);



app.listen(port , ()=> {
  console.log(`Server is listning on port number ${port}`)
  connectToDB();
})
