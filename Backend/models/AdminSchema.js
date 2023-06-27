const mongoose=require('mongoose');

const adminSchema=new mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    email:{
        type:String, 
        required:true
    },
    image:{
        type:String,
        default: "NOTSET"
    },
    password:{
        type:String, 
        required:true
    },
    phoneNo:{
        type:String,
    },
    companies:{
        type:Array,
    },

})

const Admin= mongoose.model('ADMIN',adminSchema);

module.exports= Admin;