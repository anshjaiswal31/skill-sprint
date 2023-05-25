const express = require("express")
const collection = require("../models/userSchema")
const adminCollection=require("../models/AdminSchema")
const app = express.Router()
const bcrypt = require('bcryptjs')

app.post("/", async (req, res) => {
    let { email, password, adminCheck } = req.body;

    try {
        if (adminCheck==false) 
        {
            const check = await collection.findOne({ email: email })
            if (check) 
            {
                console.log("user",bcrypt.compareSync(password, check.password));
                if (bcrypt.compareSync(password, check.password)) {
                    res.json("exist")
                }
                else { res.json("incorrect") }

            }
            else {
                res.json("notexist")
            }
        }
        else
        {
            
            const check=await adminCollection.findOne({email:email})
            console.log("admin",bcrypt.compareSync(password, check.password));
            if(check){
                if (bcrypt.compareSync(password, check.password)) {
                    res.json("existadmin")
                }
                else { res.json("incorrect") }
            }
            else {
                res.json("notexist")
            }
        }
        
    }
    catch (e) {
        console.log(e)
        res.json("notexist")
    }
})

module.exports = app