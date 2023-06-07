const express=require("express")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
const mongoose=require('mongoose')

const signUpRoute=require('./Controllers/signupreq')
const jobAppRoute=require('./Controllers/jobapplicationreq')
const logInRoute=require('./Controllers/loginreq')
const jobRoute=require('./Controllers/jobdetailsreq')
const locationsRoute=require('./Controllers/locationreq')
const jobDataRoute=require('./Controllers/jobdata')
const editProfileRoute=require('./Controllers/editprofilereq')
const changePasswordRoute=require('./Controllers/changepasswordreq')
const jobApplicationsRoute=require("./Controllers/jobappsdata")

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

app.use("/getlocations",locationsRoute)

app.use("/getjobdata",jobDataRoute)

app.use("/jobs",jobAppRoute)

app.use("/edit",editProfileRoute)

app.use("/changepw",changePasswordRoute)

app.use("/getjobapps",jobApplicationsRoute)

app.listen(3000,()=>{console.log("port connected");})