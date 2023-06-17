const express = require("express")
const job = require("../models/jobSchema")
const app = express.Router()

app.get("/", async (req, res) => {
    try{
        const allQuestions= await job.findOne({'_id' : req.params.jobId});
        console.log("id",req.query.jobId)
        res.send({status:"ok",data:allQuestions})
    }
    catch (e) {
        console.log(e)
        res.json("error")
    }
})

module.exports = app