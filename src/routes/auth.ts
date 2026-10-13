import { Router } from "express";
import { auth } from "../middleware/auth";
import { validator } from "../validations/validator";
import * as controller from "../controllers/authController";

const router = Router();

router.post("/register", validator.registerSchema, controller.register);
router.post("/login", validator.loginSchema, controller.login);
router.post("/force-login", validator.forceLoginSchema, controller.forceLogin);
router.post("/logout", auth, controller.logout);




export default router;
