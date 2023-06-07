const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    emailToken:{
        type:String
    },
    previousExperience:{
        type:String,
        
    },
    skillset:{
        type:Array,
        
    },
    currentCompany:{
        type:String,
    }
    
})

const User= mongoose.model('USER',userSchema);

module.exports= User;