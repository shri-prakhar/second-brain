import jwt , {JwtPayload} from "jsonwebtoken"
import mongoose from "mongoose";


interface DecodedToken extends JwtPayload{
    _id:mongoose.Types.ObjectId
} 

export const generateToken = async ( userId : string):Promise<string> => {
    return await jwt.sign({id: userId } , process.env.JWT_SECRET as string);
}; 

export const verifyToken =  (token: string ) => {
    const decoded = jwt.verify(token , process.env.JWT_SECRET as string) as DecodedToken
    return decoded
}   