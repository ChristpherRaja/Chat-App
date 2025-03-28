import express from "express";
import { checkAuth, login, logout, sendVerifyOtp, signup, verifyEmail } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post('/send-verify-otp',protectRoute,sendVerifyOtp);
router.post('/verify-account',protectRoute,verifyEmail);

router.get("/check", protectRoute, checkAuth);

export default router;
