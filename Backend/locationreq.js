const express = require("express")
const location=require("../models/Location")
const app = express.Router()

app.get("/",async(req,res)=>{
    try{
        const Locs=(Array.from(await location.find({},{_id:0})))
        res.send({status:"ok",data:Locs})
    }
    catch(error){ console.log(error); }}) 
    module.exports = app