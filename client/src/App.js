import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import NotFound from './pages/Notfound';
import AddFaculty from './pages/AddFaculty';
import AddCourse from './pages/AddCourse';
import AddClass from './pages/AddClass';
import SavedFaculties from './pages/SavedFaculties';
import SavedClasses from './pages/SavedClasses';
import SavedCourses from './pages/SavedCourses';
import CreateTimeTable from './pages/CreateTimeTable';
import SavedTimeTables from './pages/SavedTimeTables';
import GetSingleTT from './pages/GetSingleTT';

const App = () =>{
  return(
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addfaculty" element={<AddFaculty/>}/>
        <Route path="/addCourse" element={<AddCourse/>}/>
        <Route path="/addClass" element={<AddClass/>}/>
        <Route path="/savedfaculties" element={<SavedFaculties/>}/>
        <Route path="/savedClasses" element={<SavedClasses/>}/>
        <Route path="/savedCourses" element={<SavedCourses/>}/>
        <Route path="/createTimeTable" element={<CreateTimeTable/>}/>
        <Route path="/savedtimetables" element={<SavedTimeTables/>}/>
        <Route path="/getsinglett" element={<GetSingleTT/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </React.Fragment>
  );
};

export default App;