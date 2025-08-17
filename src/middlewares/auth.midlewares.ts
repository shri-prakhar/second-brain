import { Request , Response ,  NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { UserModel } from "../models/db";



export const verifyLogin = async (req : Request  , res : Response , next : NextFunction):Promise<void> => {
    try{
        const token = req.cookies.token;

        if (!token){
            res.status(401).json({Message : " unauthorised user "});
            return;
        }
        const decoded = verifyToken(token);


        const user = await UserModel.findById(decoded.id)

        if (!user){
            res.status(401).json({Message : "authorisation failed "});
            return;
        }
        req.user=user;
        next();
    }catch(err:unknown){
        if (err instanceof Error){
            res.status(401).json({Message : err.message});
        }else {
            console.log("something went wrong");
        }
    }

} 

export const ensureAuth= async(req : Request, res: Response, next: NextFunction)=>{
    if (req.isAuthenticated()){
        next();
        return
    }
    res.status(401).json({Message:"unauthorised"});
}
