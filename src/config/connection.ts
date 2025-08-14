import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const database_connection = async(): Promise<void> => {
    try {
        const mongo_url:string = process.env.URL || ""; 
        if (!mongo_url){
            throw new Error("mongo_url is not defined in the enviornment variable")
        }

        await mongoose.connect(mongo_url);
        console.log ("database connected succesfully");
    }catch(error: unknown){
        console.log("mongoDB connection error: ", error);
        throw error
    }
}; 