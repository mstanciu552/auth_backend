import express, { Router, Request, Response } from "express";
import passport from "passport";

const router: Router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (_: Request, res: Response) => {
    res.redirect("/");
  }
);

export default router;
