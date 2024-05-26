import asyncHandler from "../utils/asyncHandler.js"
import apiError from '../utils/apiError.js'
import apiResponse from '../utils/apiResponse.js'
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

    // if (!email.includes("@")) {
    //     throw new apiError(401, "Invalid Email Address")
    // }

    const existedAdmin = await Admin.findOne({ name })

    if (existedAdmin) {
        throw new apiError(401, "User Already Exists")
    }

    const admin = await Admin.create({
        name,
        email,
        password
    })

    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

    if (!createdAdmin) {
        throw new apiError(500, "Something went wrong while registering a Doctor")
    }

    return res.send(new apiResponse(200, createdAdmin, "doctor registered successfully"))

})

const generateAccessandRefreshToken = async (userId) => {
    try {
        const doctor = await Admin.findById(userId)
        const accessToken = doctor.generateAccessToken()
        const refreshToken = doctor.generateRefreshToken()

        doctor.refreshToken = refreshToken
        await doctor.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new apiError(500, "Something went wrong while generating access and refresh Tokens")
    }


}

const login = asyncHandler(async (req, res) => {
    // get name and password from req.body
    // name validation
    // find user using name
    // check password
    // generate access and refresh token 
    // send in cookie
    // return res

    const { name, password } = req.body

    if (!name) {
        throw new apiError(400, "name is required")
    }

    const adminFound = await Admin.findOne({ name })

    if (!adminFound) {
        throw new apiError(404, "Doctor not found")
    }

    const passwordcheck = await adminFound.isPasswordCorrect(password)
    if (!passwordcheck) {
        throw new apiError(401, "Incorrect Password")
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(adminFound._id)

    const loggedInDoctor = await Admin.findById(adminFound._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(200, {
                adminFound: loggedInDoctor, accessToken, refreshToken
            }, "User LoggedIn Successfully")
        )




})

export { login }
export { registerDoctor }   