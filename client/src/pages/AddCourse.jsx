import { Button, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import BASE from '../config/URLS';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCourse = () =>{
    const [faculty,setFaculty] = useState('select');
    const [Class,setClass] = useState('select');
    const [dept,setDept] = useState('select');
    const [classes,setClasses] = useState([]);
    const [faculties,setFaculties] = useState([]);
    const [courseName,setCourseName] = useState('');
    const [courseShortName,setCourseShortName] = useState('');
    const [courseCode,setCourseCode] = useState('');
    useEffect(()=>{
        Axios.get(`${BASE}/api/v1/class/bydept/${dept}`).then(resp=>{
            // console.log(resp);
            setClasses(resp.data.classes);
        }).catch(err=>{
            console.log(err);
        });
    },[dept]);
    useEffect(()=>{
        Axios.get(`${BASE}/api/v1/faculty/getdeptfac/${dept}`).then(resp=>{
            setFaculties(resp.data.faculties);
            // console.log(resp);
        })
    },[dept]);
    const SubmitHandler = async () =>{
        await Axios.post(`${BASE}/api/v1/course/add`,{
            courseName:courseName,
            courseShortName:courseShortName,
            courseCode:courseCode,
            dept:dept,
            Class:Class,
            faculty:faculty,
        }).then(resp=>{
            // console.log(resp);
            if(resp.data.success){
                toast(resp.data.message,{
                    theme:'light',
                    type:"success"
                });
            }else{
                toast(resp.data.message,{
                    theme:"light",
                    type:'error',
                })
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <div className="row">
            <Header/>
            <ToastContainer/>
            <div className="col-12">
                <div className="mainCon">
                    <h4>Add Course</h4>
                    <TextField label="Enter Course Name" style={Styles.textField} value={courseName} onChange={e=>{
                        setCourseName(e.target.value);
                    }}/>
                    <TextField label="Course Short Name" style={Styles.textField} value={courseShortName} onChange={e=>{
                        setCourseShortName(e.target.value);
                    }}/>
                    <TextField label="Enter Course Code" style={Styles.textField} value={courseCode} onChange={e=>{
                        setCourseCode(e.target.value);
                    }}/>
                    <FormControl fullWidth sx={{width:"90%"}}>
                        <FormLabel className='mx-2'>Select Department</FormLabel>
                        <Select value={dept} onChange={(e)=>{
                            setDept(e.target.value);
                        }}>
                            <MenuItem value="select">Select</MenuItem>
                            <MenuItem value="it">Information Technology</MenuItem>
                            <MenuItem value="mech">Mechanical</MenuItem>
                            <MenuItem value="cse">Computer Science</MenuItem>
                            <MenuItem value="eee">EEE</MenuItem>
                            <MenuItem value="ece">ECE</MenuItem>
                            <MenuItem value="eie">EIE</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={Styles.flexC}>
                        <FormLabel className='px-3 w-100'>Select Class</FormLabel>
                        <Select value={Class} style={Styles.textField} onChange={e=>{
                            setClass(e.target.value);
                        }}>
                            <MenuItem value="select">select</MenuItem>
                            {
                                classes ? classes.map(cls=>{
                                    return(<MenuItem key={cls._id} value={cls.className}>{cls.className}</MenuItem>);
                                }) : ''
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={Styles.flexC}>
                        <FormLabel className='px-3 w-100'>Select Faculty </FormLabel>
                        <Select value={faculty} style={Styles.textField} onChange={e=>{
                            setFaculty(e.target.value);
                            // console.log(e.target.value);
                        }}>
                            <MenuItem value="select">Select</MenuItem>
                            {
                                faculties ? faculties.map(fac=>{
                                    return(<MenuItem key={fac._id} value={fac.facShortName}>{fac.facultyName}</MenuItem>);
                                }) : ''
                            }
                        </Select>
                    </FormControl>
                    <Button className='mt-2' variant='contained' sx={{width:"90%"}} onClick={SubmitHandler}>Add Course</Button>
                </div>
            </div>
        </div>
    );
};

const Styles = {
    textField:{
        width:"90%",
        marginBottom:"4px"
    },
    flexC:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:"5px"
    }
}

export default AddCourse;