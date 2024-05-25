import { Router } from "express";
import { registerDoctor } from "../controllers/user.controller.js";

const doctorRouter = Router()

doctorRouter.route("/register").post(registerDoctor)

export { doctorRouter }