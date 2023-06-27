const express = require("express")
const job = require("../models/JobSchema")
const app = express.Router()

app.get("/", async (req, res) => {
    try{
        const allQuestions= await job.findOne({'_id' : req.params.jobId});
        res.send({status:"ok",data:allQuestions})
    }
    catch (e) {
        res.json("error")
    }
})
module.exports = app