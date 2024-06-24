import { Router } from "express";
import { addPatient, deletePatient, getpatientlist } from "../controllers/Patient.controller.js";

const patientRouter = Router()

patientRouter.route('/register').post(addPatient)
patientRouter.route('/list').get(getpatientlist)
patientRouter.route('/delete').put(deletePatient)


export { patientRouter }