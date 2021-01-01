import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
};
export const isGuest = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else return next();
};
