import { Router } from "express";

const router = Router();

router.get("/signup", (req, res) => {
  res.send("Admin signup");
});

export default router;
