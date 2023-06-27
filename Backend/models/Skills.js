const mongoose=require("mongoose");
const skillSchema=new mongoose.Schema({
    skill:{
        type:String,
    }
})
const Skill= mongoose.model('SKILL',skillSchema);
module.exports= Skill;