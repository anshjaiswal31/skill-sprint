const mongoose=require("mongoose");
const locationSchema=new mongoose.Schema({
    location:{
        type:String,
    }
})
const Location= mongoose.model('LOCATION',locationSchema);
module.exports= Location;