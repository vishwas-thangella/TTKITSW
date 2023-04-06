require('dotenv').config({path:'.env'});
const Colors = require('colors');
const express = require('express');
const ConnectToDb = require('./config/Database');
const FacultyRoute = require('./routes/FacultyRoute');
const ClassRoute = require('./routes/ClassRoute');
const CourseRoute = require('./routes/CourseRoute');
const TimeTableRoute = require('./routes/TimeTableRoute');
const Cors = require('cors');

const app = express();

ConnectToDb();

app.use(express.json());
app.use(Cors());
app.use('/api/v1/faculty',FacultyRoute);
app.use('/api/v1/class',ClassRoute);
app.use('/api/v1/course',CourseRoute);
app.use('/api/v1/timetable',TimeTableRoute);

app.listen(5000,()=>{
    console.log(Colors.red('Server Started !'));
});

