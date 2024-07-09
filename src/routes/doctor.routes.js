import { Router } from "express";
import { login, passwordChange, registerDoctor } from "../controllers/user.controller.js";

const doctorRouter = Router()

doctorRouter.route("/register").post(registerDoctor)
doctorRouter.route("/login").post(login)
doctorRouter.route("/changePassword").post(passwordChange)

export { doctorRouter }