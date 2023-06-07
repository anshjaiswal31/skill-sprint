const express = require("express")
const job = require("../models/jobApplications")
const app = express.Router()

app.get("/", async (req, res) => {
    try{
        let {jobid}=req.query;
        console.log("1", jobid)
        // console.log("here",req)
        const allJobs= await job.find({'jobId':jobid});
        console.log(allJobs)
        res.send({status:"ok",data:allJobs})
    }
    catch (e) {
        console.log(e)
        res.json("error")
    }
})

module.exports = app