const express = require("express")
const collection = require("../models/JobApplications")
const app = express.Router()
const logger = require('../logger')
const infoLog = logger('info');
const errorLog = logger('error');

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
        infoLog(userEmail+" job application "+jobid+" submitted succesfully")
        res.json('success')
        }
        else
        {
            res.json('empty')
        }
    }
    catch (e) {
        errorLog(e);
        res.json("error") 
    }
})
module.exports = app