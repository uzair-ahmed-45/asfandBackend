import { app } from "./app.js";
import dbConnection from "./db/index.js";



dbConnection()
    .then(() => {
        app.listen(process.env.PORT || 8000, (req, res) => {
            console.log(`Server is Running on Port ${process.env.PORT}`);
        })
    })
    .catch(error => {
        console.log("database Connection failed", error);
    })