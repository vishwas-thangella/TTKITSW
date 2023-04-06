const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    className:{
        type:String,
        required:[true,'ClassName is required !']
    },
    dept:{
        type:String,
        required:[true,'Dept is required !']
    },
    classTeacher:{
        type:String,
        required:[true,'ClassTeacher is required !']
    },
    sem:{
        type:String,
        required:[true,'Semester is required !']
    }
},
{
    timestamps:true
});
module.exports = mongoose.model('classes',ClassSchema);