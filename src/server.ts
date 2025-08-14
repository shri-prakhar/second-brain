import dotenv from "dotenv"
import app from "./app"
import { database_connection } from "./config/connection"

dotenv.config()

const PORT: number = parseInt(process.env.PORT || "5000");

const server_start = async ():Promise<void> => {
    try{
        await database_connection();
        app.listen(PORT , () => {
            console.log("server runnung on ${PORT}")
        });
    }catch(error:unknown) {
        console.error("ERROR STARTING THE SERVER:",error);
        process.exit(1);
    }
} 

server_start()
