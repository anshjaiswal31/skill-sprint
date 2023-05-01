const express = require("express")
const collection = require("../models/jobSchema")
const jobs=require("../models/formQuestion")
const app = express.Router()

app.post("/", async (req, res) => {
    let { data } = req.body

    // console.log("checkkkkk", questionList)
    // data[formQuestions]=questionList
    try{
    await collection.insertMany([data])

    // for (let i = 0; i < questionList.length; i++) {
    //     // await collection.formQuestions.push([questionList[i]]
    //     //     // var id = questionList[i]._id
    //     // )

    //   }
    
    console.log("checkkkkk 2")
    res.json('checked');
    }
    catch (e) {
        console.log(e)

        res.json("error")
    }


    
})

module.exports = app