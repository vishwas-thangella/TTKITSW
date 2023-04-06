const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    facultyName:{
        type:String,
        required:[true,'Faculty Name is required !'],
    },
    facShortName:{
        type:String,
        required:[true,'Faculty Short Name is required !']
    },
    dept:{
        type:String,
        required:[true,'Faculty Department is required !']
    }
},
{
    timestamps:true
});;

module.exports = mongoose.model('faculty',FacultySchema);


