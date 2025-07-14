import { Router } from "express";
import zod from "zod";
import userModel from "../schema/user.schema.js";

const router = Router();

// router.get("/signup", (req, res) => {
//   res.send("User signup");
// });

const signupValidation = zod.object({
  username: zod.string(),
  email: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupValidation.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Email already taken . Incorrect input",
    });
  }
  const exitinguser = userModel.findOne({
    username: body.username,
  });
  if (exitinguser._id) {
    return req.json({
      message: "Email already taken / incorrect inputs",
    });
  }
  const dbUser = await userModel.create(body);
  const token = JsonWebTokenError.sign(
    {
      userId: dbUser._id,
    },
    process.env.JWT_SECRET
  );
  res.json({
    message: "user is created successfully",
    token,
  });
});

const signinValidation = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinValidation.safeParse(req.body);

  if (!success) {
    res.json({ message: "Incorrect input" });
  }

  const user = await userModel.findOne({});
});

export default router;
