import mongoose, { Schema } from "mongoose";
import { caseSchema } from "./case/case.model.js"

export const complaintSchema = new Schema({
    complainArray: [caseSchema]
})

export const Complain = mongoose.model("Complain", complaintSchema)