const express = require("express")
const job = require("../models/jobSchema")
const app = express.Router()

app.get("/", async (req, res) => {
    try{
        const allJobs= await job.find({});
        res.send({status:"ok",data:allJobs})
    }
    catch (e) {
        console.log(e)
        res.json("error")
    }
})

module.exports = app