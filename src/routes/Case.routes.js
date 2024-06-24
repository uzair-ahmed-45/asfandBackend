import { Router } from "express";
import { behavoir, chiefComplaint, childhoodHistory, countTotalCases, generals, gyaneHistory, mind, nature, pastHistory, totalCases } from "../controllers/case.controller.js";

const caseRouter = Router()

caseRouter.route('/chiefComplaint').post(chiefComplaint)
caseRouter.route('/generals').put(generals)
caseRouter.route('/mind').put(mind)
caseRouter.route('/nature').put(nature)
caseRouter.route('/pastHistory').put(pastHistory)
caseRouter.route('/gyaneHistory').put(gyaneHistory)
caseRouter.route('/childhoodHistory').put(childhoodHistory)
caseRouter.route('/behavoir').put(behavoir)
caseRouter.route('/totalcases').post(totalCases)
caseRouter.route('/countTotalCases').get(countTotalCases)

export { caseRouter }