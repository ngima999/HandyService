import express from "express";
// import multer from "multer";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { postJob, getAllJobs, getJobById, getJobsByCustomer } from "../controllers/job.controller.js";

const router = express.Router();

// // Define multer storage
// const upload = multer({ storage: multer.memoryStorage() });

router.post("/postJob", isAuthenticated, postJob);  
router.get("/get", isAuthenticated, getAllJobs);
router.get("/get/:id", isAuthenticated, getJobById);
router.get("/customer", isAuthenticated, getJobsByCustomer);

export default router;
