import bcrypt from "bcryptjs";

export const hashedPassword =  async (password:string , gensalt:number):Promise<string> => {
    return await bcrypt.hash(password,gensalt);
};

export const comparePassword = async ( password:string , Userpassword:string):Promise<boolean> => {
    return await bcrypt.compare(password, Userpassword);
}