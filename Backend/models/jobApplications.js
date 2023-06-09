const mongoose=require("mongoose");
const answerSchema = new mongoose.Schema({
    answer: {
        type:String
    },
})

const jobApplicationSchema=new mongoose.Schema({
    jobId:{
        type:mongoose.ObjectId,
        required:true
    },
    userEmail:{
        type:String,
    },
    
    answers:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        default:'pending',
        enum:['accepted','rejected','pending']
    }
})

const JobApplication= mongoose.model('JOBAPPLICATION',jobApplicationSchema);
module.exports= JobApplication;