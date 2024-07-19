import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";

dotenv.config();

const app = express()
app.use(express.json({ limit: "20kb" }))
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.options('*' , cors())

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

// routes
import { doctorRouter } from "./routes/doctor.routes.js"
import { patientRouter } from "./routes/patient.routes.js"
import { caseRouter } from "./routes/Case.routes.js"

// routes declaration

app.use("/api/doctor", doctorRouter)
app.use("/api/patient", patientRouter)
app.use('/api/case', caseRouter)



export { app }