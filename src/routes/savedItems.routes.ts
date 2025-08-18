import { createSavedItems ,deleteSavedItems , getSavedItems ,updateSavedItems } from "../controllers/savedItems.controller";
import { Router } from "express";
import { verifyLogin } from "../middlewares/auth.midlewares";
const router = Router();

router.post("/addItem"  ,verifyLogin,  createSavedItems);
router.get("/getItem", verifyLogin , getSavedItems);
router.put("/updateItem/:id", verifyLogin , updateSavedItems);
router.delete("/deleteItem/:id" , verifyLogin ,deleteSavedItems);

export default router;