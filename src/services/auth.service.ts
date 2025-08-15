import { hashedPassword , comparePassword } from "../utils/hash";
import { generateToken  } from "../utils/jwt";
import { UserModel } from "../models/db"

interface Registration{
    user : object
    token : string
}


export const RegisterUser = async (name: string , email: string , password: string ): Promise<Registration> => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error("User Already Exists")
    }

    const hashed = await hashedPassword(password , 10 );

    const user  = await UserModel.create({
        name,
        email,
        password: hashed,
        authprovider:"email",
        profilePicture:"",
        savedItems:[],

    })

    const token = await generateToken(user._id.toString());

    return { user , token }

}

export const Login = async (email: string , password: string ): Promise<Registration> => {
    const user = await UserModel.findOne({email});

    if (!user || !user.password) {
        throw new Error("Invalid crdentials");
    }

    const compare = await comparePassword(password ,  user.password);
    if (!compare){
        throw new Error("Invalid Password");
    }

    const token = await generateToken(user._id .toString());

    return {user , token}
    
}


