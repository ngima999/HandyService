import { Job } from "../models/job.model.js";
import mongoose from "mongoose";
// import multer from "multer";


// // Configure multer storage (store files in 'uploads' directory)
// const storage = multer.memoryStorage(); // or use `multer.diskStorage()`
// const upload = multer({ storage: storage });

// // Function to convert Base64 image to Buffer
// const decodeBase64Image = (base64String) => {
//     const matches = base64String.match(/^data:image\/\w+;base64,(.+)$/);
//     if (!matches) return null;
//     return Buffer.from(matches[1], "base64");
// };

// Post Job API
export const postJob = async (req, res) => {
    try {
        console.log("Incoming data: ", req.body);

        const { title, description, date, time, cost, location, postedBy } = req.body;

        if (!title || !description || !date || !time || !cost || !location || !postedBy) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // // Convert Base64 to Buffer
        // const imageBuffer = decodeBase64Image(image);
        // if (!imageBuffer) {
        //     return res.status(400).json({ message: "Invalid image format", success: false });
        // }

        // Validate postedBy is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postedBy)) {
            return res.status(400).json({ message: "Invalid user ID", success: false });
        }

        const job = await Job.create({
            title,
            description,
            date: new Date(date),
            time,
            cost,
            location,
            postedBy
        });
        return res.status(201).json({ message: "Job created successfully", success: true, job });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};



// //Middleware for handling image upload
// export const uploadImage = upload.single("image");


//get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const job = req.query.keyboard || "";
        const query = {
            $or: [
                {title: {$regex: job, $options: "i"}},
                {location: {$regex: job, $options: "i"}}
            ]
        }

        const jobs = await Job.find(query)
                                          .populate("postedBy")  // Populate the postedBy field with the full User object
                                          .sort({ createdAt: -1 });
        if(!jobs) return res.status(404).json({message: "No jobs found", success: false});
        return res.status(200).json({jobs, success: true});

    } catch (error) {
        console.log(error)
    }
}   



//get job by id
export const getJobById = async (req, res) => {
    try{
        const jobId = req.params.id; 
        const job = await Job.findById(jobId);
        if(!job) return res.status(404).json({message: "Job not found", success: false});

        return res.status(200).json({job, success: true});   
    } catch(error){
     console.log(error)
    }
}



// get job posted by particular Customer
export const getJobsByCustomer = async (req, res) => {
try{
    
const customerId = req.id;
console.log("Customer ID:", customerId, "Type:", typeof customerId);
const jobs = await Job.find({postedBy:customerId});

if(!jobs) return res.status(404).json({message: "No jobs posted till now", success: false});

console.log(jobs)
return res.status(200).json({jobs, success: true});

}catch(error){
    console.log(error);
}
}