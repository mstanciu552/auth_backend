import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import User from "../schema/User.js";
import jwt from "jsonwebtoken";

const router: Router = express.Router();

// Register route
router.post("/register", async (req: Request, res: Response) => {
  const { email, username, first_name, last_name, password } = req.body;

  await User.findOne({ username }, (err: any, usernameExists: any) => {
    if (err) {
      throw err;
    } else {
      if (usernameExists) {
        console.log(usernameExists);
        res.send("Username already exists!");
      } else {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) res.send("Failed to encrypt password!");

          const user = new User({
            email,
            username,
            first_name,
            last_name,
            password: hashedPassword,
          });
          user.save((err) => {
            if (err) throw err;
            res.sendStatus(200);
          });
        });
      }
    }
  });
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username }).catch((err) =>
    console.error(err)
  );
  if (user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });
      } else res.send("Invalid Password");
    });
  } else res.send("Invalid Credentials");
});

export default router;
