const express = require("express")
const collection = require("../models/UserSchema")
const adminCollection = require("../models/AdminSchema")
const app = express.Router()
const bcrypt = require('bcryptjs')
const logger = require('../logger')
const infoLog = logger('info');
const errorLog = logger('error');

app.post("/", async (req, res) => {
    let { email, password, adminCheck } = req.body;
    try {
        if (adminCheck == false) {
            const check = await collection.findOne({ email: email })
            if (check != null) {
                if (bcrypt.compareSync(password, check.password)) {
                    infoLog("User "+ email+" logged in successfully");
                    res.json("user")
                }
                else {
                    res.json("Wrong password :')")
                }

            }
            else {
                res.json("User is not registered")
            }
        }
        else {
            const check = await adminCollection.findOne({ email: email })
            if (check != null) {
                if (bcrypt.compareSync(password, check.password)) {
                    infoLog("Admin " + email + " logged in successfully");
                    res.json("admin")
                }
                else { res.json("Wrong password :')") }
            }
            else {
                res.json("User is not registered")
            }
        }

    }
    catch (e) {
        errorLog(e);
        res.json("ERROR " + e)
    }
})

module.exports = app