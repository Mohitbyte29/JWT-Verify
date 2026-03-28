import { Router } from "express";
import { getProfile, login, register } from "../controllers/jwt.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router()

router.route('/auth/register').post(register)
router.route('/auth/login').post(login)
router.get('/auth/profile', authMiddleware, getProfile)

export const authRoutes = router;
