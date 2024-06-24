import mongoose from "mongoose";
import { Case } from "../models/case/case.model.js";
import { Patient, PatientList } from "../models/registerPatient.model.js";
import apiError from "../utils/apiError.js";
import Apiresponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { v4 as uuidv4 } from 'uuid';


const addPatient = asyncHandler(async (req, res) => {
    // get all details from frontend
    // check for patient exists using contact number
    // create a patient object
    // return res

    const { fullname, age, gender, occupation, contact, address } = req.body

    if ([fullname, age, gender].some((fields) => fields?.trim() === "")) {
        throw new apiError(401, "All fields are required")

    }

    if (contact.length !== 11) {
        throw new apiError(402, "Invalid Contact number");
    }

    let patientId = uuidv4()

    const patientexists = await Patient.findOne({ fullname })

    if (patientexists) {
        throw new apiError(400, "Patient already registered")

    }

    const createdPatient = await Patient.create({
        patientId,
        fullname,
        age,
        gender,
        occupation,
        contact,
        address,
    })

    let patientlist = await PatientList.findOne()
    if (!patientlist) {
        patientlist = new PatientList({ patients: [] })
    }
    patientlist.patients.push(createdPatient)
    await patientlist.save()

    return res.send(new Apiresponse(200, createdPatient, "Patient registered Successfully"))
})

// geting patientlist
const getpatientlist = asyncHandler(async (req, res) => {
    // find patient list 
    // return patientlist

    const patientlist = await PatientList.findOne()
    if (!patientlist) {
        throw new apiError(404, "No Patients Found")
    }

    return res.json(new Apiresponse(200, patientlist.patients, "patients list fetched successfully"))
})

const deletePatient = asyncHandler(async (req, res) => {
    // get patient from frontend using contact
    // if patient found then delete it from patient model
    // find patientlist
    // if patientlist is found then delete patient from there using filter
    // save the patientlist
    // return res
    try {
        const { patientid } = req.body;

        const patientFound = await Patient.findById(patientid);

        if (!patientFound) {
            throw new apiError(404, "Patient not found");
        }
        await patientFound.deleteOne();
        const caseDelete = await Case.deleteMany(
            { "chiefComplaint.patientfoundid": patientid }
        )
        if (!caseDelete) {
            throw new apiError(400, "Troubling with Casex delete")

        }


        let patientList = await PatientList.findOne()
        if (!patientList) {
            throw new apiError(404, "Patient list not found");
        }
        patientList.patients = patientList.patients.filter(patient => patient._id.toString() !== patientFound._id.toString());
        await patientList.save()

        return res.json(new Apiresponse(200, patientFound, "Patient deleted successfully"));
    } catch (error) {
        console.error(error);
        throw new apiError(500, "Something went wrong");
    }
});


export { addPatient }
export { getpatientlist }
export { deletePatient }
