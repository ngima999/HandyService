import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({ fullname, email, phoneNumber, password: hashPassword, role });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Login user and return token
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        if (user.role !== role) {
            return res.status(400).json({ message: "Invalid role", success: false });
        }

        const tokenData = {
            userId: user._id,
            role: user.role
        };

        // Generate JWT token
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role, 
            profile: user.profile
        };

        // Send token in an HTTP-only cookie
        return res.status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,  // 1 day
                httpOnly: true,  // Prevents access from JavaScript
                sameSite: 'strict',  // Helps protect against CSRF
                https: true  // Ensures secure cookie
            })
            .json({
                message: `Welcome ${user.fullname}`,
                user,
                success: true
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};



// Logout (Client should remove token from localStorage)
export const logout = async (req, res) => {
    try {
        // Clear the cookie
        return res.status(200)
            .clearCookie("token")
            .json({ message: "Logout successful", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};



//Update user profile
export const updateProfile = async (req, res) => {
    try{
        const { fullname, email, phoneNumber, experience, rating, role, skills } = req.body;
        const file = req.file;

        //cloudinary upload
        
        let skillsArray
        if (skills) {
            skillsArray = skills.split(",")
        }
        const userId = req.id;  // from the auth middleware
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User does not exist", success: false });
        }


      
    
         // ✅ Only update fields if they exist in req.body
         if (fullname) user.fullname = fullname;
         if (email) user.email = email;
         if (phoneNumber) user.phoneNumber = phoneNumber;
         if (role) user.role = role;
         if (experience) user.profile.experience = experience;
         if (rating) user.profile.rating = rating;
         if (skillsArray) user.profile.skills = skillsArray;
        
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role, 
            profile: user.profile
        };


        return res.status(200).json({
            user,
            message: "Profile updated successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}