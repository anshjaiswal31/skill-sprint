const express = require("express")
const collection = require("../models/UserSchema")
const admincollection = require("../models/AdminSchema")
const app = express.Router()
const bcrypt = require('bcryptjs')
const validator = require("validator")
const crypto = require("crypto")

app.post("/", async (req, res) => {
    let { name, email, password, phoneNo, adminCheck } = req.body
    let hash = bcrypt.hashSync(password, 10);
    const data = {
        name: name,
        email: email,
        password: hash,
        phoneNo: phoneNo,
        emailToken: crypto.randomBytes(64).toString("hex"),
    }

    const re_phone = /^[6-9]{1}[0-9]{9}$/;
    const re_pw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (name.length < 1) {
        res.json("Enter your name please")
    }
    else if (!validator.isEmail(email)) {
        res.json("Enter a valid email address")
    }
    else if (!re_pw.test(password)) {
        res.json("The password must contain atleast 8 characters including 1 letter and 1 number")
    }
    else if (!re_phone.test(phoneNo)) {
        res.json("Enter a valid phone number.")
    }
    else {
        try {
            if (adminCheck == false) {
                const check = await collection.findOne({ email: email })

                if (check) {
                    res.json("User already registered")
                }
                else {
                    await collection.insertMany([data])
                    res.json('user');
                }
            }
            else {
                const check = await admincollection.findOne({ email: email })

                if (check) {
                    res.json("User already registered")
                }
                else {
                    await admincollection.insertMany([data])
                    res.json('admin');
                }
            }
        }
        catch (e) {
            res.json("unknown error "+e)
        }
    }
})
module.exports = app