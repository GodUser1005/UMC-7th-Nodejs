import passport from "passport";
import { googleStrategy, naverStrategy } from "./auth.config.js";
import { JSONParse } from "json-with-bigint";

passport.use(googleStrategy);
passport.use(naverStrategy);

passport.serializeUser((user, done) => {
    //console.log(user);
    done(null,user)}
);
passport.deserializeUser((user,done) => {
    console.log(JSONParse(user.id));
    console.log(user);
    done(null, user);
});

export default passport;