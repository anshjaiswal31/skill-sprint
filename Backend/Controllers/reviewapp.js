const express = require("express")
const collection = require("../models/JobApplications")
const app = express.Router()
const logger = require('../logger')
const errorLog = logger('error');

app.post("/", async (req, res) => {
    let { status,appID } = req.body
    try{
        if(status==1)
        await collection.updateOne({_id: appID}, {status: "accepted"});
        else if(status==0)
        await collection.updateOne({_id: appID}, {status: "rejected"});
    res.json('updated');
    }
    catch (e) {
        errorLog(e);
        res.json("error")
    } 
})
module.exports = app