import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver";
import { prisma } from "./db.config.js";
import { JSONStringify } from "json-with-bigint";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
        clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/google",
        scope: ["email", "profile"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
        return googleVerify(profile)
            .then((user) => cb(null, user))
            .catch((err) => cb(err));
    }
)

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if(!email){
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({where : {email: email}});
    if(user !== null){
        return { id: JSONStringify(user.id), email: user.email, name: user.name};
    }

    const created = await prisma.user.create({
        data: {
            name: profile.displayName,
            gender: 0,
            birth: new Date(1970,0,1),
            address: "추후수정",
            phoneNo: "추후 수정",
            email
        },
    });
    return {id : JSONStringify(created.id), email:created.email, name: created.name};
};

export const naverStrategy = new NaverStrategy(
    {
        clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
        clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/naver",
    },
    (accessToken,refreshToken,profile,done) =>{
        return naverVerify(profile)
            .then((user) => done(null, user))
            .catch((err) => done(err))
    }
)

const naverVerify = async (profile) => {
    const naver_id = profile.id
    console.log(profile);
    if(!naver_id){
        throw new Error(`profile.naver_id was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({where : {naverId: naver_id}});
    if(user !== null){
        console.log("네이버 회원가입이 되어있습니다.")
        return { id: JSONStringify(user.id)};
    }

    const created = await prisma.user.create({
        data: {
            name: profile.displayName,
            gender: 0,
            birth: new Date(1970,0,1),
            address: "추후수정",
            phoneNo: "추후 수정",
            email: profile.emails[0].value,
            naverId : naver_id
        },
    });
    return {id : JSONStringify(created.id)};
}