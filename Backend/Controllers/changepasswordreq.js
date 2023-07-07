const express = require("express")
const collection = require("../models/UserSchema")
const admincollection = require("../models/AdminSchema")
const app = express.Router()
const bcrypt = require('bcryptjs')
const logger = require('../logger')
const infoLog = logger('info');
const errorLog = logger('error');


async function passwordUpdate(db, currentPassword, data, email) {
    const check = await db.findOne({ email: email })
    if (check) {
        if (bcrypt.compareSync(currentPassword, check.password)) {
            await db.updateOne({ email: email }, data);
            infoLog(email+" changed his password")
            return "Your password has been changed successfully.";
        }
        else {
            return "The current password you entered is incorrect.";
        }
    }
    else {
        return '404 User not found';
    }
}

app.post("/", async (req, res) => {
    let { email, currentPassword, password, adminCheck } = req.body
    let hash = bcrypt.hashSync(password, 10);
    const data = {
        password: hash
    }
    const re_pw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    try {
        if (!re_pw.test(password)) {
            res.json("The password must contain atleast 8 characters including 1 letter and 1 number.")
        }
        else if (adminCheck == false) {
            let response = await passwordUpdate(collection, currentPassword, data, email)
            res.json(response)
        }
        else {
            let response = await passwordUpdate(admincollection, currentPassword, data, email)
            res.json(response)
        }
    }
    catch (e) {
        errorLog(e);
        res.json("unknown error")
    }
})
module.exports = app