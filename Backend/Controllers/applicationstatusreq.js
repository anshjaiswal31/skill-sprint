// const express = require("express")
// const jobApps = require("../models/jobApplications")
// const app = express.Router()

// app.get("/", async (req, res) => {

//     let { id,email } = req.query;
//     try{
//         const status= await jobApps.findOne({jobId:id, userEmail:email},{status:1});
//         res.send({status:"ok",data:status})
//     }
//     catch (e) {
//         console.log(e)
//         res.json("error")
//     }
// })

// module.exports = app