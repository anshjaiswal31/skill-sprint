const express = require("express")
const skills=require("../models/Skills")
const app = express.Router()
const logger = require('../logger')
const errorLog = logger('error');

app.get("/",async(req,res)=>{
    try{
        const Locs=(Array.from(await skills.find({},{_id:0})))
        res.send({status:"ok",data:Locs})
    }
    catch(error){ 
        errorLog(error);
        console.log(error); 
    }
}) 
module.exports = app