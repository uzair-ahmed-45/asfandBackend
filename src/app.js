import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({limit: "20kb"}))
app.use(cors({
    origin : process.env.CORS_ORIGIN
}))
app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

// routes
import { doctorRouter } from "./routes/doctor.routes.js"

// routes declaration
app.use("/" , (req, res)=>{
    res.json("hello world")
})
app.use("/api/doctor" , doctorRouter)



export {app}