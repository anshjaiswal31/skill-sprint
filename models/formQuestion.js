const mongoose=require("mongoose");

const formQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
    }
})

const FormQuestion= mongoose.model('FORMQUESTION',formQuestionSchema);
module.exports= FormQuestion;