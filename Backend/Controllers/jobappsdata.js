const express = require("express")
const job = require("../models/jobApplications")
const app = express.Router()
const { ObjectId } = require('mongodb');
app.get("/", async (req, res) => {
    try{
        let {jobid}=req.query;
        console.log("11111111", jobid)
        
        // const _id = new ObjectId(jobid);
        
        const allJobs= await job.find({'jobId':jobid}) 
        console.log(allJobs,"1111")
        res.send({status:"ok",data:allJobs})
    }
    catch (e) {
        console.log(e)

        res.json("error")
    }
})

module.exports = app