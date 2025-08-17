import { Request ,  Response } from "express";
import { RegisterUser, Login } from "../services/auth.service";
import { signupSchema , signinSchema } from "../validations/auth.validation";

 
export const signup = async (req:Request , res:Response):Promise<void> => {
    try {
        const { name, email, password }  =  signupSchema.parse(req.body);

        const { user , token } = await RegisterUser(name , email , password);

        res.cookie("token" , token , {
            httpOnly: true ,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7*24*60*60*1000
        }).status(201).json({ user });
    }catch(err:unknown) {
        if (err instanceof Error){
            res.status(400).json({message:err.message});
        }else {
            console.log("unknown error")
        }
    }};

export const signin = async (req : Request , res : Response ): Promise<void> => {
        try {
            const { email , password } = signinSchema.parse(req.body)

            const { user , token } = await Login( email , password );

            res.cookie("token" , token , {
                httpOnly: true ,
                secure : process.env.NODE_ENV === "production",
                maxAge: 7*24*60*60*1000
                //samesite = "lax" for cross origin request 
            }).status(200).json({user});

        }catch(err:unknown){
            if (err instanceof Error ){
                res.status(401).json({message: err.message});
            }else {
                console.log("unknown error");
            }
        }

    };

    export const logout = (_:Request  , res: Response )=>{
        res.clearCookie("token").status(200).json({Message : "Logged Out Successfully."});
    }

    export const googlecallbackController = async (_req:Request , res: Response) => {

            res.redirect(process.env.CLIENT_URL || "http://localhost:3000/")
        
    }

    export const protectedController = async (req:Request , res:Response):Promise<void> => {
        if (!req.isAuthenticated() || !req.user){
             res.status(401).json({
                Message: "Unauthorised"
            })
            return
        }
        res.status(200).json({user: req.user})
    }
    export const logoutController =async (req:Request,res:Response) => {
        req.logout(err => {
            if (err){
                return res.status(400).json({Message : err.Message})
            }
            res.clearCookie("connect.sid");
            res.status(200).json({Message: "Logout Successfully."})
        })
    }


