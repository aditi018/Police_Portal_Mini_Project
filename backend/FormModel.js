const mongoose = require ("mongoose");

const FormSchema = new mongoose.Schema({
    ComplainantName:{
        type: String,
        required : true,
    },
    ComplainantAddress :{ 
        type:  String,
        required : true,
    },
    dateTime : {
        type : String,
        required : true,
    },
    accussedName: {
        type:  String,
    },
    accussedAddress : {
        type:  String,
    },
    descriptionOfCrime :{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("FormData",FormSchema);