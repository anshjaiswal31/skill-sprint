const express = require("express")
const collection = require("../models/UserSchema")
const admincollection = require("../models/AdminSchema")
const app = express.Router()
const logger = require('../logger')
const infoLog = logger('info');
const errorLog = logger('error');


app.post("/", async (req, res) => {
    let { email, image, adminCheck } = req.body
    
    const data = {
        image: image
    }
    try {
        if (adminCheck == false) {
            await collection.updateOne({email:email}, data);
            infoLog("User "+email+" added profile picture")
        }
        else {
            await admincollection.updateOne({email:email}, data);
            infoLog("Admin "+email+" added profile picture")
        }
        res.json("Profile Picture changed successfully") 
    }
    catch (e) {
        errorLog(e);
        res.json("unknown error")
    }

})
module.exports = app