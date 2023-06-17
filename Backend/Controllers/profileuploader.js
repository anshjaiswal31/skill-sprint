const express = require("express")
const collection = require("../models/userSchema")
const admincollection = require("../models/AdminSchema")
const app = express.Router()
// const bodyParser=require("body-parser")
// app.use(bodyParser.urlencoded({extended: true,parameterLimit:100000, limit:"500mb"}))
// app.use(bodyParser.json({limit:"500mb"}))


app.post("/", async (req, res) => {
    let { email, image, adminCheck } = req.body
    //a
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