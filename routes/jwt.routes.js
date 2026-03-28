import { Router } from "express";
import { login, register } from "../controllers/jwt.controller.js";

const router = Router()

router.route('/auth/register').post(register)
router.route('/auth/login').post(login)
// router.route('/auth/login').post()
// router.route('/auth/profile')

export const authRoutes = router;
