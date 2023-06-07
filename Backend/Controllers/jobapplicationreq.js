const express = require("express")
const collection = require("../models/jobApplications")
const admin = require("../models/AdminSchema")
const user=require("../models/userSchema")
const app = express.Router()
function NoneEmpty(arr) {
    return arr.indexOf("") === -1;
  }
app.post("/", async (req, res) => 
{
    let { answers,jobid,userEmail } = req.body
    
    const data = {
        answers: answers,
        jobId: jobid,
        userEmail: userEmail,
    }
    try {
        if(NoneEmpty(answers))
        {
        await collection.insertMany([data])
        console.log("answers done")
        res.json('success')
        }
        else
        {
            res.json('empty')
        }
    }
    catch (e) {
        console.log(e)
        res.json("error") 
    }
})
module.exports = app