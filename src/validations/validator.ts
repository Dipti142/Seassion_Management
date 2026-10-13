import { validate } from "../middleware/validate";
import { registerSchema } from "./register.validation";
import { loginSchema } from "./login.validation";
import { forceLoginSchema } from "./forceLogin.validation";

export const validator = {
  registerSchema: validate(registerSchema),
  loginSchema: validate(loginSchema),
  forceLoginSchema: validate(forceLoginSchema),
};
