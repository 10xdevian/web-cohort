import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./db.js";
import mainRouter from "./routes/main.route.js";
dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(PORT, () => {
  console.log(`Server is Listining on port http://localhost:${PORT}`);
  dbConnect();
});
