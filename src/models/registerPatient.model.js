import mongoose, { Schema } from "mongoose";

export const patientSchema = new Schema({
    patientId: {
        type: String,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },

}, {
    timestamps: true
});

export const patientArraySchema = new Schema({
    patients: [patientSchema]
}, {
    timestamps: true
});



export const Patient = mongoose.model("Patient", patientSchema);
export const PatientList = mongoose.model("PatientList", patientArraySchema);
