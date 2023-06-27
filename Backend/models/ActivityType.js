const mongoose=require('mongoose');

const activityTypeSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    adminTask:{
        type:Boolean,
        required:true,
        default:0,
    }
})

const ActivityType= mongoose.model('ACTIVITYTYPE',activityTypeSchema);
module.exports= ActivityType;