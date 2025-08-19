import { Router } from "express";
import { shareitems } from "../controllers/shared.controller";
import { verifyLogin } from "../middlewares/auth.midlewares";

const router = Router();

router.post("/shareItems" , verifyLogin , shareitems);

export default router;