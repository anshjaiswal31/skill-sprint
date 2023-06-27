const express = require("express")
const collection = require("../models/UserSchema")
const admincollection = require("../models/AdminSchema")
const app = express.Router()

app.post("/", async (req, res) => {
    let { email, image, adminCheck } = req.body
    
    const data = {
        image: image
    }
    try {
        if (adminCheck == false) {
            await collection.updateOne({email:email}, data);
        }
        else {
            await admincollection.updateOne({email:email}, data);
        }
        res.json("Profile Picture changed successfully") 
    }
    catch (e) {
        console.log(e)
        res.json("unknown error")
    }

})
module.exports = app