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

router.get("/logout", (req: Request, res: Response) => {
  req.logout();
  res.redirect("/login");
});

export default router;
