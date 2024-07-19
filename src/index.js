import mongoose from "mongoose";
import { app } from "./app.js";
import { config } from "dotenv";
import { db_name } from "./constants.js"

config({
    path: "./env"
});


try {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
} catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
}

app.listen(process.env.PORT || 8000, (req, res) => {
    console.log(`Server is Running on Port ${process.env.PORT}`);
})
