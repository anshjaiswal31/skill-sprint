const mongoose=require("mongoose");

const jobApplicationSchema=new mongoose.Schema({
    jobId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['accepted','rejected']
    }
})

const JobApplication= mongoose.model('JOBAPPLICATION',jobApplicationSchema);

module.exports= JobApplication;