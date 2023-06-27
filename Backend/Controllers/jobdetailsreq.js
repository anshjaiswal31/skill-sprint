const express = require("express")
const collection = require("../models/JobSchema")
const app = express.Router()

app.post("/", async (req, res) => {
    let { data } = req.body
    try{
    await collection.insertMany([data])
    res.json('checked');
    }
    catch (e) {
        res.json("error")
    } 
})
module.exports = app