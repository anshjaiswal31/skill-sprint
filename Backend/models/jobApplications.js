const mongoose=require("mongoose");
const answerSchema = new mongoose.Schema({
    answer: {
        type:String
    },
    // qid:{
    //     type:String
    // }
})

const jobApplicationSchema=new mongoose.Schema({
    jobId:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        // required:true
    },
    
    answers:{
        type:Array,
        required:true
    },
    
    
    // [answerSchema],

    status:{
        type:String,
        default:'pending',
        enum:['accepted','rejected','pending']
    }
})

const JobApplication= mongoose.model('JOBAPPLICATION',jobApplicationSchema);

module.exports= JobApplication;