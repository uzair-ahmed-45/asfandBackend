import { Router } from "express";
import { behavoir, caseNo, chiefComplaint, childhoodHistory, countTotalCases, diagnosis, generals, getCaseNo, gyaneHistory, labTests, mind, nature, pastHistory, remedies, totalCases } from "../controllers/case.controller.js";

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
caseRouter.route('/labTests').put(labTests)
caseRouter.route('/diagnosed').put(diagnosis)
caseRouter.route('/remedies').put(remedies)
caseRouter.route('/getcaseNo').get(getCaseNo)
caseRouter.route('/caseNo').put(caseNo)


export { caseRouter }