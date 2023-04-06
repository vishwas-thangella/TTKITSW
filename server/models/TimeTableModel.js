const mongoose = require('mongoose');

const TimeTableSchema = new mongoose.Schema({
    TimeTable:{
        type:Array,
        required:[true,'TimeTable is required !']
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('timetables',TimeTableSchema);