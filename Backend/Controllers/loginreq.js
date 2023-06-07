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
                    res.json("user")
                }
                else { res.json("Wrong password :')") }

            }
            else {
                res.json("User is not registered")
            }
        }
        else
        {
            
            const check=await adminCollection.findOne({email:email})
            console.log("admin",bcrypt.compareSync(password, check.password));
            if(check){
                if (bcrypt.compareSync(password, check.password)) {
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
        console.log(e)
        res.json("ERROR "+e)
    }
})

module.exports = app