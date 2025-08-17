import passport from "passport";
import { Strategy as Googlestrategy, Profile,  } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User as IUser, User, UserModel } from "../models/db"
import { HydratedDocument } from "mongoose";

dotenv.config();


// type Userserial = {
//     _id?:number
// }

passport.use(new Googlestrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!, //"this !"It tells TypeScript:"I know this value is not null or undefined, trust me."
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/api/auth/google/callback",
}, async (accessToken:string , refreshToken:string , profile:Profile, done:(err:unknown , user?:HydratedDocument<IUser> | false ) => void) => {
    try {
        const email = profile.emails?.[0].value;
        if (!email){
            return done(new Error("User already exists!!") , undefined);
        }
        let user = await UserModel.findOne({email});
        if(!user){
                    user = await UserModel.create({
                    name: profile.displayName,
                    email,
                    authprovider:"googleId",
                    profilePicture:profile.photos?.[0]?.value || "",
                    savedItems:[]
                 });
        }
        done(null, user) // null for that no error has been found 
    }catch(error){
        done(error , undefined);
        }
    }
))

passport.serializeUser<string>((User: Express.User , done:(err:unknown , id?: string ) => void) =>{ done( null , User.id?.toString())});
passport.deserializeUser(async (id:string, done:(err:unknown , user?: Express.User | null)=> void) => {
    try {
        const user = await UserModel.findById(id);
    
        done(null , user)
    }catch(err:unknown){
        if (err instanceof Error){
            console.log(err.message)
        }
    }
})
