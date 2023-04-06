const { AddTimeTable, getTimeTable, DeleteTimeTable, getTTDates, GetSingleTT } = require('../controllers/TimeTableController');

const Router = require('express').Router();


Router.post('/add',AddTimeTable);
Router.get('/timetables',getTimeTable);
Router.delete('/:id',DeleteTimeTable);
Router.get('/dates',getTTDates);
Router.get('/single/:date/:class',GetSingleTT);

module.exports = Router;