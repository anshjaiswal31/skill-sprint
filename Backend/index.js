
const express=require("express")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
const mongoose=require('mongoose')
const signUpRoute=require('./signupreq')
const logInRoute=require('./loginreq')
const jobRoute=require('./jobdetailsreq')

mongoose.connect("mongodb://0.0.0.0:27017/job-portal-app")
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log('failed',e);
})


app.get("/",cors(),(req,res)=>{
})

app.use("/signup",signUpRoute)

app.use("/login",logInRoute)

app.use("/jobdetails",jobRoute)
// app.post("/verify-email",signUpRoute.verifyEmail);

app.listen(3000,()=>{console.log("port connected");})