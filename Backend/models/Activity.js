const mongoose=require('mongoose');

const activitySchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    dateTime:{
        type:Date,
        required:true
    },
    activityType:{
        type:String,
    },
    

    
})

const Activity= mongoose.model('ACTIVITY',activitySchema);

module.exports= Activity;