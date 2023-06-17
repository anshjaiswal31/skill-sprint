const express = require("express")
const collection = require("../models/jobApplications")
const app = express.Router()

app.post("/", async (req, res) => {
    let { status,appID } = req.body
    console.log("checkkk", status, "hello", appID)
    try{
        if(status==1)
        await collection.updateOne({_id: appID}, {status: "accepted"});
        else if(status==0)
        await collection.updateOne({_id: appID}, {status: "rejected"});
    res.json('updated');
    }
    catch (e) {
        console.log(e)
        res.json("error")
    } 
})
module.exports = app