const { AddCourse, getallCourses, DeleteCourse } = require('../controllers/CourseController');

const Router = require('express').Router();

Router.post('/add',AddCourse);
Router.get('/get',getallCourses);
Router.delete('/delete/:id',DeleteCourse);

module.exports = Router;