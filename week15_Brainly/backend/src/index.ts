import Express from "express";
import cors from "cors";

const app = Express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({
    msg: "Hello world",
  });
});

app.listen(3000, () => {
  console.log("server is starting ");
});
