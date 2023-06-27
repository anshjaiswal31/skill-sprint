const express = require("express")
const skills=require("../models/Skills")
const app = express.Router()

app.get("/",async(req,res)=>{
    try{
        const Locs=(Array.from(await skills.find({},{_id:0})))
        res.send({status:"ok",data:Locs})
    }
    catch(error){ 
        console.log(error); 
    }
}) 
module.exports = app