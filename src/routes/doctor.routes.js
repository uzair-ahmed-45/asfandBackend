import { Router } from "express";
import { login, registerDoctor } from "../controllers/user.controller.js";

const doctorRouter = Router()

doctorRouter.route("/register").post(registerDoctor)
doctorRouter.route("/login").post(login)

export { doctorRouter }