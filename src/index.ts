import mongoose from "mongoose"; 
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { PORT, URL } from "./config";


const app=express();

app.use(cors()); // cross origin resource sharing allows us to decide who are allowed to hit our backend server 
app.disable("x-powered-by"); //reduces fingerprinting (disables headers by which attacker could got to know we are using express in our backend server)
app.use(cookieParser());
app.use(helmet()); // protects the website with various malcious attacks (check the doc)
app.use(express.urlencoded({extended : false })); // whenever there comes the data from the form METHOD ="POST" this parses that data into {key : value} pair so if extended ='true' that it parses more complex data as well
app.use(express.json());

// mongoose.Promise = global.Promise; // this line tells to use native javascript promise implementation because in older versions mongoose have uses it own promise definations 
// this line not needed because mongoose 5.0+ uses native javascript only 
mongoose.set("strictQuery", false); // this disables the mongoose strict queries    

async function main(): Promise<void>{
    try{
        await mongoose.connect(URL as string, 
            //useNewUrlParser: true, // uses new url string parser 
            //useUnifiedTopology: true, //uses more efficient server discovery and monitering engine 
        ); // in mongoose 6.0 version these all options are enabled by default 
        console.log("connnected to database");
        app.listen(PORT, () => {
            console.log("connected to localhost: ${PORT}"); 
        });
    } catch(e){
        console.error(e);
    }
}

main();