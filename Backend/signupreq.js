const express = require("express")
const collection = require("../models/userSchema")
// const cors=require("cors")
const app = express.Router()
const bcrypt = require('bcryptjs')
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(cors()) 
const jwt = require("jsonwebtoken")
const validator=require("validator")
const crypto=require("crypto")

app.post("/", async (req, res) => {
    let { name, email, password, phoneNo } = req.body
    let hash = bcrypt.hashSync(password, 10);
    const data = {
        name: name,
        email: email,
        password: hash,
        phoneNo: phoneNo,
        emailToken:crypto.randomBytes(64).toString("hex"),

    }
    
    const re_phone = /^[6-9]{1}[0-9]{9}$/;
    const re_pw=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(name.length<1)
    {
        res.json("invalidname")
    }
    else if(!validator.isEmail(email))
    {
        res.json("invalidemail")
    }
    else if(!re_pw.test(password))
    {
        res.json("invalidpw")
    }
    else if(!re_phone.test(phoneNo))
    {
        res.json("invalidnumber")
    }
    else 
    {
        try {
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
        catch (e) {
            console.log(e)

            res.json("error")
        }
    }
})
// const createToken=(_id)=>{
//     const jwtkey=process.env.REACT_APP_SECRET_KEY;

//     return jwt.sign({_id},jwtkey,{expiresIn:"3d"});

// };
// const verifyEmail=async (req,res)=>{
//     try{
//         const emailToken=req.body.emailToken;
//         if(!emailToken)
//             return res.json("token404");
//         const user= await collection.findOne({emailToken});

//         if(user){
//             user.emailToken=null;
//             user.isVerified=true;

//             await user.save();

//             const token=createToken(user._id);

//             res.json({
//                 _id:user._id,
//                 name:user.name,
//                 email:user.email,
//                 token,
//                 isVerified:user?.isVerified,
//             });
//         }
//         else
//         res.json("verifiyfail");
//     }
//     catch(e){
//         console.log(e);
//         res.json("verifyerror");
//     }
// };

module.exports = app