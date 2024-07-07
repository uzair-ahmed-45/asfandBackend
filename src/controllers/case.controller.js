import { Patient } from "../models/registerPatient.model.js";
import { Case } from "../models/case/case.model.js";
import apiError from "../utils/apiError.js";
import Apiresponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";




const chiefComplaint = asyncHandler(async (req, res) => {
    const {
        patientid,
        caseNo,
        StartDate,
        Location,
        Sensation,
        Duration,
        Modalities,
        Agravation,
        Amelioration,
        OtherComplaints
    } = req.body;

    if (!patientid) {
        throw new apiError(400, "Patient ID is required");
    }
    if (!caseNo) {
        throw new apiError(402, "Case no is required")

    }

    if (!mongoose.Types.ObjectId.isValid(patientid)) {
        throw new apiError(400, "Invalid Patient ID format");
    }

    const patientfound = await Patient.findById(patientid);
    console.log("Patient found:", patientfound);

    if (!patientfound) {
        throw new apiError(404, "Patient not found");
    }
    const patient = patientfound
    const patientfoundid = patientfound._id
    if (!patient) {
        throw new apiError(400, "unable to get patient name")
    }
    console.log(patient);
    const createdchiefComplaint = await Case.create({
        chiefComplaint: {
            patient,
            patientfoundid,
            caseNo,
            StartDate,
            Location,
            Sensation,
            Duration,
            Modalities,
            Agravation,
            Amelioration,
            OtherComplaints
        }
    });
    return res.status(200).json(new Apiresponse(200, { createdchiefComplaint }, "Chief Complaint registered successfully"));
});

const totalCases = asyncHandler(async (req, res) => {
    const { patientid } = req.body;

    if (!patientid) {
        throw new apiError(400, "Patient ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(patientid)) {
        throw new apiError(400, "Invalid Patient ID format");
    }

    const patient = await Patient.findById(patientid);

    if (!patient) {
        throw new apiError(404, "Patient not found");
    }

    const caseCount = await Case.countDocuments({ 'chiefComplaint.patientfoundid': patientid });

    return res.status(200).json(new Apiresponse(200, caseCount, "Successful"));
});
const countTotalCases = asyncHandler(async (req, res) => {

    try {
        const totalCases = await Case.countDocuments()
        return res.status(200).json(new Apiresponse(200, totalCases, "Successfull"))

    } catch (error) {
        console.log(error);
    }
})


const generals = asyncHandler(async (req, res) => {
    const {
        complainId,
        caseNo,
        thermal,
        hungerTolerance,
        eatingSpeed,
        appetite,
        perspiration,
        badHabits,
        thirst,
        dream,
        urine,
        sleep,
        sleepPosition,
        foodDesires,
        stool,
        sensitivity
    } = req.body;

    if (!complainId) {
        throw new apiError(400, "Complain ID is required");
    }
    if (!caseNo) {
        throw new apiError(402, "Case no is required")

    }
    const complain = await Case.findById(complainId);

    if (!complain) {
        throw new apiError(404, "Complain not found");
    }

    complain.generals = {
        thermal,
        hungerTolerance,
        caseNo,
        eatingSpeed,
        appetite,
        perspiration,
        badHabits,
        thirst,
        dream,
        urine,
        sleep,
        sleepPosition,
        foodDesires,
        stool,
        sensitivity
    }

    await complain.save();

    return res.status(200).json(new Apiresponse(200, { complain }, "General details added successfully"));
});

const mind = asyncHandler(async (req, res) => {
    const {
        complainId,
        familyRelation,
        caseNo,
        friendsRelation,
        gathering,
        memory,
        willPower,
        personality
    } = req.body

    if (!complainId) {
        throw new apiError(401, "complain ID is required")
    }
    if (!caseNo) {
        throw new apiError(402, "Case no is required")

    }
    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "complain not found")
    }

    complain.mind = {
        caseNo,
        familyRelation,
        friendsRelation,
        gathering,
        memory,
        willPower,
        personality
    }

    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "Mind Details added successfully"))

})

const nature = asyncHandler(async (req, res) => {
    const {
        complainId,
        caseNo,
        nature,
        anxiety
    } = req.body

    if (!complainId) {
        throw new apiError(401, "Complain Id is required")
    }
    if (!caseNo) {
        throw new apiError(402, "Case no is required")

    }
    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.nature = {
        caseNo,
        nature,
        anxiety
    }
    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "nature details added successfully"))

})

const pastHistory = asyncHandler(async (req, res) => {
    const {
        complainId,
        caseNo,
        patientHistory,
        patientFamilyHistory,
        patientDrugHistory
    } = req.body

    if (!complainId) {
        throw new apiError(401, "Complain Id is required")
    }
    if (!caseNo) {
        throw new apiError(402, "Case no is required")

    }
    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.pastHistory = {
        caseNo,
        patientHistory,
        patientFamilyHistory,
        patientDrugHistory
    }
    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "Past History details added successfully"))

})

const gyaneHistory = asyncHandler(async (req, res) => {
    const {
        complainId,
        caseNo,
        menstrual,
        Pain,
        bleeding,
        clotting,
        leukorrhea
    } = req.body

    if (!complainId) {
        throw new apiError(401, "Complain Id is required")
    }
    if (!caseNo) {
        throw new apiError(402, "Case no is required")

    }
    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.gyaneHistory = {
        caseNo,
        menstrual,
        Pain,
        bleeding,
        clotting,
        leukorrhea
    }
    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "Gyane History details added successfully"))

})

const childhoodHistory = asyncHandler(async (req, res) => {
    const {
        complainId,
        caseNo,
        Nature
    } = req.body

    if (!complainId) {
        throw new apiError(401, "Complain Id is required")
    }
    if (!caseNo) {
        throw new apiError(402, "Case no is required")

    }
    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.childhoodHistory = {
        caseNo,
        Nature
    }
    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "childhood History details added successfully"))

})

const behavoir = asyncHandler(async (req, res) => {
    const {
        complainId,
        caseNo,
        Behavior
    } = req.body

    if (!complainId) {
        throw new apiError(401, "Complain Id is required")
    }
    if (!caseNo) {
        throw new apiError(402, "Case no is required")

    }
    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.behavoir = {
        caseNo,
        Behavior
    }
    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "Behavior details added successfully"))

})

const labTests = asyncHandler(async (req, res) => {
    const {
        complainId,
        caseNo,
        tests
    } = req.body

    if (!complainId) {
        throw new apiError(400, "Complain ID is required")
    }
    if (!caseNo) {
        throw new apiError(402, "Case no is required")

    }
    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.labTests = {
        caseNo,
        tests
    }
    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "Lab Tests added successfully"))

})
const diagnosis = asyncHandler(async (req, res) => {
    const {
        complainId,
        caseNo,
        diagnosed
    } = req.body

    if (!complainId) {
        throw new apiError(400, "Complain ID is required")
    }

    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.diagnosed = {
        caseNo,
        diagnosed
    }
    await complain.save()

    return res.status(200).json(new Apiresponse(200, { complain }, "Diagnosis details added successfully"))
})

const remedies = asyncHandler(async (req, res) => {
    const {
        complainId,
        caseNo,
        remedies
    } = req.body

    if (!complainId) {
        throw new apiError(400, "Complain ID is required")
    }

    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.remedies = {
        caseNo,
        remedies
    }
    await complain.save()

    return res.status(200).json(new Apiresponse(200, { complain }, "Remedies are added Successfully"))
})

export { chiefComplaint };
export { generals }
export { mind }
export { nature }
export { pastHistory }
export { gyaneHistory }
export { childhoodHistory }
export { behavoir }
export { totalCases }
export { countTotalCases }
export { labTests }
export { diagnosis }
export { remedies }
