const express = require("express")
const user = require("../models/UserSchema")
const admin = require("../models/AdminSchema")
const app = express.Router()

app.get("/", async (req, res) => {
    let { email,adminCheck} = req.query
    try{
        let img=""
        if(adminCheck=='false')
        img= await user.findOne({'email' : email},{'image':1});
        else
        img= await admin.findOne({'email' : email},{'image':1});
        
        if(img!=null)
        res.send({status:"ok",data:img})
        else
        res.send({status:"ok",data:{image:"NOTSET"}})
    }
    catch (e) {
        res.json("error")
    }
})
module.exports = app