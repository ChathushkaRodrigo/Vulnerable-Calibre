

const mongoose = require('mongoose')

const StudentIdImageSchema = new mongoose.Schema({ //SubmissionPage Schema

    link: {
        type: String

    },
    Studentid: {
        type: String

    }
    
})
const StudentIdImage = mongoose.model("StudentIdImage", StudentIdImageSchema)
module.exports = StudentIdImage