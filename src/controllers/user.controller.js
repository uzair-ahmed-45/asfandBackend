import asyncHandler from "../utils/asyncHandler.js"
import  apiError  from '../utils/apiError.js'
import  apiResponse  from '../utils/apiResponse.js'
import { Admin } from "../models/Admin.model.js"


const registerDoctor = asyncHandler(async (req, res) => {
    // get name and password from frontend
    // all fields are required
    // email validation
    // check if user already exists
    // create user object
    // remove password and refreshtoken
    // return res
    const { name, email, password } = req.body
    console.log(name);

    if ([name, email, password].some((fields) => fields?.trim() === "")) {
        throw new apiError(400, "All fields are required")
    }

    if (!email.includes("@")) {
        throw new apiError(401, "Invalid Email Address")
    }

    const existedAdmin = await Admin.findOne({ email })

    if (existedAdmin) {
        throw new apiError(401 , "User Already Exists")
    }

    const admin = await Admin.create({
        name,
        email,
        password
    })

    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

    if (!createdAdmin) {
        throw new apiError(500 , "Something went wrong while registering a Doctor")
    }

    return res.send(new apiResponse(200 , createdAdmin , "doctor registered successfully"))

})

export { registerDoctor }