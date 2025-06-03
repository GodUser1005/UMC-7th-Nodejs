import express from "express"
import passport from "../passport.js";

export const authRouter = express.Router();


authRouter.get("/login/google", 
    //#swagger.ignore = true
    passport.authenticate("google"));
  
authRouter.get(
    //#swagger.ignore = true
    "/callback/google",
    passport.authenticate("google", {
      failureRedirect: "/oauth2/login/google",
      failureMessage: true,
    }),
    (req, res) => res.redirect("/")
);

authRouter.get(
    //#swagger.ignore = true
    "/login/naver",
    passport.authenticate("naver")
);

authRouter.get(
    //#swagger.ignore = true
    "/callback/naver",
    passport.authenticate("naver",{
        failureRedirect: "/oauth2/login/naver",
        failureMessage: true,
    }),
    (req, res) => res.redirect("/")
);
