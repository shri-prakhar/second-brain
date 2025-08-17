import Router from "express";
import { signup, signin , logout, googlecallbackController, protectedController , logoutController } from "../controllers/auth.controllers"
import passport from "passport";


const router = Router();

router.post("/signup" , signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/google" , passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/google/callback" , passport.authenticate("google" , {failureRedirect: "api/auth/signup"}) , googlecallbackController);
router.get("/me" , protectedController); //check current session
router.get("/google/logout" , logoutController)
export default router; 
