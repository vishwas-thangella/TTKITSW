import { Button, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import BASE from '../config/URLS';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddClass = () =>{
    const [className,setClassName] = useState('');
    const [sem,setSem] = useState('select');
    const [faculty,setFaculty] = useState('select');
    const [dept,setDept] = useState('select');
    const [courseFac,setCourseFac] = useState([]);
    useEffect(()=>{
        axios.get(`${BASE}/api/v1/faculty/getdeptfac/${dept}`).then(resp=>{
            // console.log(resp);
            if(resp.data.success){
                setCourseFac(resp.data.faculties);
            }
        }).catch(err=>{
            console.log(err);
        })
    },[dept]);
    const SubmitHandler = async () =>{
        await axios.post(`${BASE}/api/v1/class/add`,{className:className,dept:dept,classTeacher:faculty,sem:sem}).then(resp=>{
            // console.log(resp)
            if(resp.data.success){
                toast(resp.data.message,{draggable:true,position:'top-right',theme:'light',type:'success'});
            }else{
                toast(resp.data.message,{draggable:true,position:'top-right',theme:'light',type:'error'});
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
                    <h4>Add Class</h4>
                    <TextField label="Enter Class Name" style={Styles.textField} className="mb-2" onChange={e=>{
                        setClassName(e.target.value);
                    }}/>
                    <FormControl fullWidth sx={{width:"90%"}}>
                        <FormLabel className='pl-1'>Select Department</FormLabel>
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
                    <FormControl fullWidth>
                        <FormLabel className='mx-4'>Select Class Teacher</FormLabel>
                        <Select value={faculty} style={{width:"90%",margin:"auto"}} className="mb-2" onChange={e=>{
                            setFaculty(e.target.value);
                        }}>
                            <MenuItem value="select">select</MenuItem>
                            {
                                courseFac ? courseFac.map(fac=>{
                                    return(<MenuItem key={fac._id} value={fac.facultyName}>{fac.facultyName}</MenuItem>);
                                }) : ''
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel className='mx-4'>Select Semester</FormLabel>
                        <Select value={sem} style={{width:"90%",margin:"auto"}} className="mb-2" onChange={e=>{
                            setSem(e.target.value);
                        }}>
                            <MenuItem value="select">select</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8">8</MenuItem>
                        </Select>
                    </FormControl>
                    <Button sx={{width:"90%"}} variant="contained" className='mt-3' onClick={SubmitHandler}>Add Class</Button>
                </div>
            </div>
        </div>
    );
};

const Styles = {
    textField:{
        width:"90%"
    }
}

export default AddClass;