const express = require("express")
const job = require("../models/jobSchema")
const app = express.Router()

app.get("/", async (req, res) => {
    try {
        let { email } = req.query;
        
        console.log("Email", email)
        const allJobs= await job.aggregate([
            {
                $lookup: {
                    from: "jobapplications",
                    localField: "_id",
                    foreignField: "jobId",
                    as: "application"
                },
            },
            {
                $unwind: "$application",
            },
            {
                $match: {
                    "application.userEmail": email,
                }
            },
            {
                $project: {
                    "_id": 1,
                    "title": 1,
                    "dueDate": 1,
                    "application.status": 1,
                    "description": 1,
                    "ctcLakhs": 1,
                    "location": 1,
                    "requiredSkillset": 1,
                    "jobType": 1,
                    "formQuestions": 1
                }
            },
        ]).exec();
        // const allJobs= await job.find({});
        console.log(allJobs, "here")
        res.send({ status: "ok", data: allJobs })
    }
    catch (e) {
        console.log(e)
        res.json("error")
    }
})

module.exports = app