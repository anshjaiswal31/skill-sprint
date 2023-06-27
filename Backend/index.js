const express=require("express")
const cors=require("cors")
const app=express()
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));
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
const questionsRoute=require("./Controllers/getquestions")
const reviewRoute=require("./Controllers/reviewapp")
const profileUploadRoute=require("./Controllers/profileuploader")
const profileImageRoute=require("./Controllers/getProfileImage")
const userDataRoute=require("./Controllers/userdata")
const skillsRoute=require('./Controllers/skillsreq')

mongoose.connect("mongodb://0.0.0.0:27017/job-portal-app")
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log('failed',e);
})


app.get("/",cors(),(req,res)=>{})

app.use("/signup",signUpRoute)

app.use("/login",logInRoute)

app.use("/jobdetails",jobRoute)

app.use("/getlocations",locationsRoute)

app.use("/getjobdata",jobDataRoute)

app.use("/jobs",jobAppRoute)

app.use("/edit",editProfileRoute)

app.use("/changepw",changePasswordRoute)

app.use("/getjobapps",jobApplicationsRoute)

app.use("/questions", questionsRoute)

app.use("/review", reviewRoute)

app.use("/uploadImage", profileUploadRoute)

app.use("/getProfileImg",profileImageRoute)

app.use("/getuserdata",userDataRoute);

app.use('/getskills',skillsRoute);

app.listen(3000,()=>{console.log("port connected");})