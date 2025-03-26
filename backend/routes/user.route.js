import express from 'express';
import { signup, signin, logout, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";


const router = express.Router();

router.route("/signup").post(singleUpload, signup) 
router.route("/signin").post(signin)
router.route("/logout").get(logout)
router.route("/profile/update").put(isAuthenticated, updateProfile)



export default router;