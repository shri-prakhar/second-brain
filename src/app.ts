import express, { Request, Response }from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import authRoutes from "./routes/auth.routes"
import dotenv from "dotenv"
import session from "express-session"
import passport from "passport"
import "./config/passport";
import ItemsRoutes from "./routes/savedItems.routes"



dotenv.config();


const app  = express();


app.use(express.json()); //parses the json data 
app.use(cookieparser()); //parses the cookie data 
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true, //allows the cookies, authorisation headers or TLS certificate to be sent to the server 
    // methods:["GET", "POST", "PUT", "DELETE"], //allows the specified methods to be used in the request 
    // allowedHeaders:["Content-Type", "Authorization"], //allows the specified headers to be used in the request 
}));


app.use(express.urlencoded({extended:true})); //parses the url encoded data 

app.use(session({
    secret: process.env.JWT_SECRET!,
    resave: true ,
    saveUninitialized:true ,
    cookie:{
        httpOnly: true,
        secure:false,
        maxAge: 7*24*60*60*1000 
    }}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes); //authRoutes is the router that contains the routes for the auth endpoints
app.use("/items" , ItemsRoutes);



app.get("/", (_: Request , res: Response ) => { //{"_" used because req is not used to avoid ts or eslint error  _ is used }
    res.send("second brain api is running")
});


export default app