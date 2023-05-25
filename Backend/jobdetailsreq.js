const express = require("express")
const collection = require("../models/jobSchema")
const jobs=require("../models/formQuestion")
const locs=require("../models/Location")
const app = express.Router()

app.post("/", async (req, res) => {
    let { data } = req.body
    try{
    await collection.insertMany([data])
    res.json('checked');
    }
    catch (e) {
        console.log(e)

        res.json("error")
    }


    
})
module.exports = app