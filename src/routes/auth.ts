import express, { Request, Response, Router } from "express";
import User from "../schema/User.js";
import jwt from "jsonwebtoken";

const router: Router = express.Router();

// Register route
router.post("/register", (req: Request, res: Response) => {
  const { email, username, first_name, last_name, password } = req.body;

  const user = new User({
    email,
    username,
    first_name,
    last_name,
    password,
  });

  user.save((err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username }).catch((err) =>
    console.error(err)
  );
  if (user) {
    if (password === user.password) {
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken });
    } else res.send("Invalid Password");
  } else res.send("Invalid Credentials");
});

export default router;
