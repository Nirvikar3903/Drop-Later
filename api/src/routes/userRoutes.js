    import { Router } from "express";
import * as yup from "yup";
import { validate } from "../utils/validate.js";
import * as userController from "../controllers/userController.js";

const router = Router();

// schema
const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

// route
router.post("/register", validate(registerSchema), userController.register);

export default router;
