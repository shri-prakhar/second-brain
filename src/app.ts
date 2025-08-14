import express, { Request, Response }from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express(); 

app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_: Request , res: Response ) => { //{"_" used because req is not used to avoid ts or eslint error  _ is used }
    res.send("second brain api is running")
});

export default app