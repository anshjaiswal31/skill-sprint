const express = require("express")
const collection = require("../models/UserSchema")
const admincollection = require("../models/AdminSchema")
const app = express.Router()
const validator = require("validator")
const logger = require('../logger')
const infoLog = logger('info');
const errorLog = logger('error');

app.post("/", async (req, res) => {
    let { name, email, phoneNo,adminCheck} = req.body
    const data = {
        name: name,
        email: email,
        phoneNo: phoneNo,
    }
    const re_phone = /^[6-9]{1}[0-9]{9}$/;
    if (!validator.isEmail(email)) {
        res.json("Enter a valid email address.")
    }
    else if (!re_phone.test(phoneNo)) {
        res.json("Enter a valid phone number.")
    }
    else {
        try {
            if (adminCheck == false) {
                const check = await collection.findOne({ email: email })

                if (check) {
                    
                    await collection.updateOne({email:email}, data);
                    infoLog("User "+email+" updated his profile")
                    res.json("Updated.")
                }
                else {
                    
                    res.json('User not found.');
                }
            }
            else {
                const check = await admincollection.findOne({ email: email })

                if (check) {
                    await admincollection.updateOne({email:email}, data);
                    infoLog("Admin "+email+" updated his profile")
                    res.json("Updated.")
                }
                else {
                    res.json('User not found.');
                }
            }
        }
        catch (e) {
            errorLog(e);
            res.json("error occured "+e)
        }
    }
})
module.exports = app