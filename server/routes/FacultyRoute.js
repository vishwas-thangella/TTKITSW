const express = require('express');
const { AddFaculty, DeleteFaculty, getAllFaculties, getDeptFac } = require('../controllers/FacultyController');

const Router = express.Router();

Router.post('/add',AddFaculty);
Router.delete('/delete/:id',DeleteFaculty);
Router.get('/get',getAllFaculties);
Router.get('/getdeptfac/:dept',getDeptFac);

module.exports = Router;
