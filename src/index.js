import mongoose from "mongoose";
import { app } from "./app.js";
import { config } from "dotenv";
import { db_name } from "./constants.js"

config({
    path: "./env"
});


try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URL}`)
    console.log(`Database Connected !! Host ${connection.connection.host}/${db_name}`);
} catch (error) {
    console.log(`Database Connection error ${error}`)
}

app.listen(process.env.PORT || 8000, (req, res) => {
    console.log(`Server is Running on Port ${process.env.PORT}`);
})
