import { createTag , getallTags , deleteTag } from "../controllers/tag.controller";
import { Router } from "express";
import { verifyLogin } from "../middlewares/auth.midlewares";

const router = Router();

router.post("/addTag" , verifyLogin,  createTag);
router.get("/getTags" , verifyLogin , getallTags);
router.delete("/deleteTag/:name"  ,verifyLogin,  deleteTag);

export default router;