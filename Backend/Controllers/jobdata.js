const express = require("express")
const job = require("../models/JobSchema")
const app = express.Router()
const logger = require('../logger')
const errorLog = logger('error');

app.get("/", async (req, res) => {
    try {
        let { email } = req.query;
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
        // console.log(allJobs)
        res.send({ status: "ok", data: allJobs })
    }
    catch (e) {
        errorLog(e);
        res.json("error")
    }
})
module.exports = app