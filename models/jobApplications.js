const mongoose=require("mongoose");
const answerSchema = new mongoose.Schema({
    answer: {
        type:String
    },
    qid:{
        type:String
    }
})

const jobApplicationSchema=new mongoose.Schema({
    jobId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    
    answers:[answerSchema],

    status:{
        type:String,
        enum:['accepted','rejected','pending']
    }
})

const JobApplication= mongoose.model('JOBAPPLICATION',jobApplicationSchema);

module.exports= JobApplication;