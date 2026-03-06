import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validator.js";


const router = Router()

router.post('/register',validate(registerSchema), AuthController.register)

router.post('/login',validate(loginSchema), AuthController.login)

router.get("/verify/:token", AuthController.verifyEmail);
export default router