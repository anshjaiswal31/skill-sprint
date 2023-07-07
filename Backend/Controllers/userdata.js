const express = require("express")
const admin=require("../models/AdminSchema")
const user=require("../models/UserSchema")
const app = express.Router()
const logger = require('../logger')
const errorLog = logger('error');

app.get("/", async (req, res) => {
    try {
        let { email,adminCheck } = req.query;
        console.log("butter",email,adminCheck)
        let data=[]
        if(adminCheck=="true")
        {
            data= await admin.findOne({ email: email },{image:0});
        }
        else
        {
            data= await user.findOne({ email: email },{image:0});
        }
        res.send({ status: "ok", data: data })
    }
    catch (e) {
        errorLog(e);
        res.json("error")
    }
})
module.exports = app