import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bid"
        }
    ]
}, {timestamps: true});

export const Job = mongoose.model("Job", jobSchema);