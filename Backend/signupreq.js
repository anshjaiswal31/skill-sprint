const express = require("express")
const collection = require("../models/userSchema")
const admincollection = require("../models/AdminSchema")
const app = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
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
        res.json("invalidname")
    }
    else if (!validator.isEmail(email)) {
        res.json("invalidemail")
    }
    else if (!re_pw.test(password)) {
        res.json("invalidpw")
    }
    else if (!re_phone.test(phoneNo)) {
        res.json("invalidnumber")
    }
    else {
        try {
            if (adminCheck == false) {
                const check = await collection.findOne({ email: email })

                if (check) {
                    res.json("exist")
                }
                else {
                    console.log("checkkkkk", data)
                    await collection.insertMany([data])
                    // const token=jwt.sign({email:email},process.env.REACT_APP_SECRET_KEY,{expiresIn:'2h'})
                    // console.log(token);
                    console.log("checkkkkk 2")
                    res.json('notexist');
                }
            }
            else {
                const check = await admincollection.findOne({ email: email })

                if (check) {
                    res.json("exist")
                }
                else {
                    await admincollection.insertMany([data])
                    console.log("checker admin", data)
                    res.json('notexistadmin');
                }
            }
        }
        catch (e) {
            console.log(e)

            res.json("error")
        }
    }
})
module.exports = app