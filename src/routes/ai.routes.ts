import { aiSummary } from "../controllers/ai.controller";
import { Router } from "express";
import { verifyLogin } from "../middlewares/auth.midlewares";

const router = Router();

router.get("/getSummary/:id" , verifyLogin , aiSummary);


export default router;