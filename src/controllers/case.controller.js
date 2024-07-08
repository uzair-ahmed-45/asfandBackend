import { Patient } from "../models/registerPatient.model.js";
import { Case } from "../models/case/case.model.js";
import apiError from "../utils/apiError.js";
import Apiresponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";




const chiefComplaint = asyncHandler(async (req, res) => {
    const {
        patientid,
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

    const complain = await Case.findById(complainId);

    if (!complain) {
        throw new apiError(404, "Complain not found");
    }

    complain.generals = {
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
    }

    await complain.save();

    return res.status(200).json(new Apiresponse(200, { complain }, "General details added successfully"));
});

const mind = asyncHandler(async (req, res) => {
    const {
        complainId,
        familyRelation,
        friendsRelation,
        gathering,
        memory,
        willPower,
        personality
    } = req.body

    if (!complainId) {
        throw new apiError(401, "complain ID is required")
    }

    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "complain not found")
    }

    complain.mind = {
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
        nature,
        anxiety
    } = req.body

    if (!complainId) {
        throw new apiError(401, "Complain Id is required")
    }

    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.nature = {
        nature,
        anxiety
    }
    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "nature details added successfully"))

})

const pastHistory = asyncHandler(async (req, res) => {
    const {
        complainId,
        patientHistory,
        patientFamilyHistory,
        patientDrugHistory
    } = req.body

    if (!complainId) {
        throw new apiError(401, "Complain Id is required")
    }

    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.pastHistory = {
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
        menstrual,
        Pain,
        bleeding,
        clotting,
        leukorrhea
    } = req.body

    if (!complainId) {
        throw new apiError(401, "Complain Id is required")
    }

    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.gyaneHistory = {
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
        Nature
    } = req.body

    if (!complainId) {
        throw new apiError(401, "Complain Id is required")
    }

    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.childhoodHistory = {
        Nature
    }
    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "childhood History details added successfully"))

})

const behavoir = asyncHandler(async (req, res) => {
    const {
        complainId,
        Behavior
    } = req.body

    if (!complainId) {
        throw new apiError(401, "Complain Id is required")
    }

    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.behavoir = {
        Behavior
    }
    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "Behavior details added successfully"))

})

const labTests = asyncHandler(async (req, res) => {
    const {
        complainId,
        tests
    } = req.body

    if (!complainId) {
        throw new apiError(400, "Complain ID is required")
    }

    const complain = await Case.findById(complainId)
    if (!complain) {
        throw new apiError(404, "Complain not found")
    }

    complain.labTests = {
        tests
    }
    await complain.save()
    return res.status(200).json(new Apiresponse(200, { complain }, "Lab Tests added successfully"))

})
const diagnosis = asyncHandler(async (req, res) => {
    const {
        complainId,
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
        diagnosed
    }
    await complain.save()

    return res.status(200).json(new Apiresponse(200, { complain }, "Diagnosis details added successfully"))
})

const remedies = asyncHandler(async (req, res) => {
    const {
        complainId,
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
        remedies
    }
    await complain.save()

    return res.status(200).json(new Apiresponse(200, { complain }, "Remedies are added Successfully"))
})
const caseNo = asyncHandler(async (req, res) => {
    const { complainId, caseNo } = req.body;

    if (!complainId) {
        throw new apiError(400, "Complain ID is required");
    }

    const complain = await Case.findById(complainId);
    if (!complain) {
        throw new apiError(404, "Complain not found");
    }

    complain.caseNo = {
        caseNumber: caseNo
    };
    await complain.save();

    return res.status(200).json(new Apiresponse(200, { complain }, "Case number added successfully"));
})

const getCaseNo = asyncHandler(async (req, res) => {
    try {
        const lastcase = await Case.findOne({})
            .sort({ 'caseNo.caseNumber': -1 })
            .limit(1);

        let newCaseNo = 1;

        if (lastcase && lastcase.caseNo && lastcase.caseNo.caseNumber) {
            newCaseNo = lastcase.caseNo.caseNumber + 1;
        }

        return res.status(200).json(new Apiresponse(200, { caseNo: newCaseNo }, "Successful"));
    } catch (error) {
        console.log("Error in getCaseNo:", error);
        return res.status(500).json(new Apiresponse(500, error, "An error occurred"));
    }
});



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
export { getCaseNo }
export { caseNo }

