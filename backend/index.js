import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import bidRoute from "./routes/bid.route.js";


dotenv.config({});


const app = express();



//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));   // parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieParser());                           // parse cookies
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
};                                                 // enable CORS for localhost:3000
app.use(cors(corsOptions));  



//Routes
const PORT = process.env.PORT || 3000;



app.use("/api/user", userRoute);

app.use((req, res, next) => {
    console.log("Headers:", req.headers);
    console.log("Cookies:", req.cookies);
    next();
});

app.use("/api/job", jobRoute);
app.use("/api/bid", bidRoute);



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
}
)


