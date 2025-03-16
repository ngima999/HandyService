import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { updateStatus, getApplicants, getAppliedJobs, applyJob } from "../controllers/bid.controller.js";
const router = express.Router();



//Routes
router.post("/applyJob/:id", isAuthenticated, applyJob);
router.post("/updateStatus/:id", isAuthenticated, updateStatus);
router.get("/getApplicants", isAuthenticated, getApplicants);
router.get("/getAppliedJobs", isAuthenticated, getAppliedJobs);  

export default router;
