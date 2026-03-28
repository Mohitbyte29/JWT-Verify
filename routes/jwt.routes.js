import { Router } from "express";
import { register } from "../controllers/jwt.controller";

const router = Router()

router.route('/auth/register').post(register)
router.route('/auth/login').post()
router.route('/auth/profile')

