const express=require("express")
const collection=require("../models/userSchema")
const app=express.Router()
const bcrypt=require('bcryptjs')
// const jwt=require("jsonwebtoken")

app.post("/",async(req,res)=>{
    let{email,password}=req.body;
    
    try{
        const check=await collection.findOne({email:email})
        // const token=jwt.sign({email:email},process.env.REACT_APP_SECRET_KEY,{expiresIn:'2h'})
        // jwt.verify(token,process.env.REACT_APP_SECRET_KEY)
        if(check){
            console.log(bcrypt.compareSync(password,check.password));
            if(bcrypt.compareSync(password,check.password))
            {
                res.json("exist")
            }
            else{res.json("incorrect")}
            
        }
        else{
            res.json("notexist")
        }
    }
    catch(e){
        console.log(e)
        res.json("notexist")
    }
})

module.exports=app