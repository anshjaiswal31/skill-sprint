const mongoose=require("mongoose");

const companySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    openings:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    }
})

const Company= mongoose.model('COMPANY',companySchema);

module.exports= Company;