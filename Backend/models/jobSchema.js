const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: {
        type:String
    },
})
const jobSchema = new mongoose.Schema({
    requiredSkillset: {
        type: Array,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    ctcLakhs: {
        type: Number,
        required: true
    },
    jobType: {
        type: String,
        enum: ['remote', 'onsite']
    },
    location: {
        type: Array,
        required: true
    },
    formQuestions: [questionSchema]
})

const Job = mongoose.model('JOB', jobSchema);

module.exports = Job;