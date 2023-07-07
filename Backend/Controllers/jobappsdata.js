const express = require("express")
const job = require("../models/JobApplications")
const app = express.Router()
const logger = require('../logger')
const errorLog = logger('error');

app.get("/", async (req, res) => {
    try{
        let {jobid}=req.query;
        const allJobs= await job.find({'jobId':jobid}) 
        res.send({status:"ok",data:allJobs})
    }
    catch (e) {
        errorLog(e)
        res.json("error")
    }
})
module.exports = app