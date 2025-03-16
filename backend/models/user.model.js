import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Customer", "serviceProvider"],
        required: true
    }, 
    profile: {
        experience: {
            type: String
        },
        skills: {
            type: [String]
        },
        rating: {
            type: Number
        },
        profilePhoto: {
            type: String,
            default:""
        }
        
    }
}, {timestamps:true});


export const User = mongoose.model("User", userSchema);
    