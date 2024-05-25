import express from "express"
import cors from "cors"

const app = express()

app.use(cors())

app.get("/" , (req , res)=>{
    res.send("hello world")
})
app.listen(5000 , ()=>{
    console.log("Server is running on port 5000");
})