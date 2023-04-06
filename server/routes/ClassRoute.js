const { AddClass, getClassByDept, getAllClasses, DeleteClass } = require('../controllers/ClassController');

const Router = require('express').Router();

Router.post('/add',AddClass);
Router.get('/bydept/:dept',getClassByDept);
Router.get('/all',getAllClasses);
Router.delete('/delete/:id',DeleteClass);

module.exports = Router;