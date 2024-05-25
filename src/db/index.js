import mongoose from "mongoose";
import {db_name} from '../constants.js'

const dbConnection = async (req , res , next) =>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`Database Connected !! Host ${connection.connection.host}/${db_name}`);

    } catch (error) {
        console.log("Mongodb Connection error" , error);
    }
}

export default dbConnection;