import { Bid } from "../models/bid.model.js";
import { Job } from "../models/job.model.js";


// apply for a job
export const applyJob = async (req, res) => {
    try {
        console.log("inside applyJob");
        console.log("🔹 Received Request Body:", req.body);

        const userId = req.id;
        const jobId = req.params.id;

        console.log("🟢 User ID:", userId);
        console.log("🟢 Job ID:", jobId);

        if (!userId) return res.status(400).json({ message: "User ID is missing in request." });
        if (!jobId) return res.status(400).json({ message: "Job ID is required." });

        // Check if the user has already applied for the job
        const existingBid = await Bid.findOne({ job: jobId, applicant: userId });
        if (existingBid) {
            return res.status(400).json({ message: "You have already applied for this job", success: false });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({ message: "Job not found", success: false });
        }

        // Create a new bid
        const newBid = await Bid.create({ job: jobId, applicant: userId });

        job.bids.push(newBid._id);
        await job.save();

        return res.status(201).json({ message: "Bid applied successfully", success: true });

    } catch (error) {
        console.log("🔥 Error in applyJob:", error);
        res.status(500).json({ error: error.message });
    }
};



// get applied job
export const getAppliedJobs = async (req, res) => {
    try{
        const userId = req.id;
        const bids = await Bid.find({applicant: userId}).sort({createdAt: -1}).populate({
            path: "job", 
            option: {sort:{createdAt: -1}}, 
            populate: { 
               path: "postedBy", 
               option: {sort:{createdAt: -1}}
            }
            })

        if(!bids) return res.status(404).json({message: "No applications found", success: false});
        return res.status(200).json({application, success: true});
    } catch (error) {
        console.log(error);
    }
}


// get all applicants
export const getApplicants = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate(
            {
                path: "bids",
                option: {sort: {createdAt: -1}},
                populate: {
                    path: "applicant"
                }
            }
        );
        if(!job) return res.status(404).json({message: "Job not found", success: false});
        return res.status(200).json({job, success: true});

    } catch (error) {
        console.log(error);
    }
}




export const updateStatus = async (req, res) => {
    try{
        const status = req.body.status;
        const applicantionId = req.params.id;

        if(!status) return res.status(400).json({message: "Status is required"});

        //find bid by applicantion id
        const application = await Bid.findOne({_id: applicantionId});
        if(!application) return res.status(404).json({message: "Bid not found", success: false});

        //update bid status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({message: "Application status updated successfully", success: true});

    } catch (error){
        console.log(error);
    }
}

