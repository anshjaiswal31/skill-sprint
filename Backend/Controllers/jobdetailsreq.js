const express = require("express")
const collection = require("../models/JobSchema")
const app = express.Router()
const logger = require('../logger')
const infoLog = logger('info');
const errorLog = logger('error');

app.post("/", async (req, res) => {
    let { data } = req.body
    try{
    await collection.insertMany([data])
    infoLog("Job opening added successfully");
    res.json('checked');
    }
    catch (e) {
        errorLog(e);
        res.json("error")
    } 
})
module.exports = app