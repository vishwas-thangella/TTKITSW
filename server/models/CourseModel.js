const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:[true,'Coruse name is required !']
    },
    courseShortName:{
        type:String,
        required:[true,'Course ShortName is required !']
    },
    courseCode:{
        type:String,
        required:[true,'Course Code is required ! ..']
    },
    dept:{
        type:String,
        required:[true,'dept is required !']
    },
    Class:{
        type:String,
        required:[true,'Class is required ! ']
    },
    faculty:{
        type:String,
        required:[true,'Faculty is required !']
    },

},
{
    timestamps:true
});

module.exports = mongoose.model('courses',CourseSchema);