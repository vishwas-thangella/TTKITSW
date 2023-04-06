import { Button, FormControl, FormLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Axios from 'axios';
import BASE from '../config/URLS';

const CreateTimeTable = () =>{
    const _date = new Date();
    const  date = _date.getDate();
    const mnth = _date.getMonth()+1;  
    const yr = _date.getFullYear();
    let index = 0;
    const [classes,setClasses] = useState([]);
    const [dept,setDept] = useState('select');
    const [courses,setCourses] = useState([]);
    const [TimeTable,setTimeTable] = useState([
        {
            day:"Monday",
            Classes:[]
        },
        {
            day:"Tuesday",
            Classes:[]
        },
        {
            day:"Wednesday",
            Classes:[]
        },
        {
            day:"Thursday",
            Classes:[]
        },
        {
            day:"Friday",
            Classes:[]
        },
        {
            day:"Saturday",
            Classes:[]
        }
    ]);
    useEffect(()=>{
        Axios.get(`${BASE}/api/v1/course/get`).then(resp=>{
            if(resp.data.success){
                setCourses(resp.data.courses);
            }
        })
    });  
    useEffect(()=>{
        setTTClasses();
    },[classes]);
    const setTTClasses = async () =>{
        TimeTable.forEach(tt=>{
            // console.log(TimeTable[index]);
            classes.forEach(cls=>{
                TimeTable[index].Classes.push({
                    className:cls.className,
                    data:[
                        {
                            time:"09:10 - 10:00",
                            course:"select",
                            faculty:"select",
                            room:""
                        },
                        {
                            time:"10:00 - 10:50",
                            course:"select",
                            faculty:"select",
                            room:""
                        },
                        {
                            time:"10:50 - 11:40",
                            course:"select",
                            faculty:"select",
                            room:""
                        },
                        {
                            time:"11:40 - 12:30",
                            course:"select",
                            faculty:"select",
                            room:""
                        },
                        {
                            time:"12:30 - 01:30",
                            course:"lunch",
                            faculty:"lunch",
                            room:""
                        },
                        {
                            time:"01:30 - 02:20",
                            course:"select",
                            faculty:"select",
                            room:""
                        },
                        {
                            time:"02:20 - 03:10",
                            course:"select",
                            faculty:"select",
                            room:""
                        },
                        {
                            time:"03:10 - 04:00",
                            course:"select",
                            faculty:"select",
                            room:""
                        }
                    ]
                })
            })
            index+=1;
        })
    };
    useEffect(()=>{
        if(dept!=='select'){
            Axios.get(`${BASE}/api/v1/class/bydept/${dept}`).then(resp=>{
                // console.log(resp);
                if(resp.data.success){
                    setClasses(resp.data.classes);
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    },[dept]);
    const saveTimeTable = async () =>{
        Axios.post(`${BASE}/api/v1/timetable/add`,{
            TimeTable:TimeTable
        }).then(resp=>{
            if(resp.data.success){
                alert('TimeTable Saved !')
            }else{
                alert(resp.data.message);
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <div className="row">
            <Header/>
            <div className="col-12">
                <Stack direction="row">
                    <FormControl fullWidth required>
                        <FormLabel className='mx-4 mt-2'>Select Department</FormLabel>
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
                </Stack>
                <div className="tbCont">
                    {
                        ((dept!=='select')) ? (
                            <Box>
                                <h5 className='text-center mt-2 mb-2' onClick={()=>{
                                    for(let i=0;i<TimeTable.length;i++){
                                        console.log(TimeTable[i]);
                                    }
                                }}>Time Table</h5>
                                <h6 className='mx-2 mt-3 mb-4'>Date : {date} - {mnth} - {yr}</h6>
                                <Box>
                                    {
                                        TimeTable.map(tt=>{
                                            return(
                                                <Box key={tt.day}>
                                                    <Typography className='text-success p-4'>{tt.day}</Typography>
                                                    <TableContainer component={Paper}>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Branch</TableCell>
                                                                    <TableCell>09:10 - 10:00</TableCell>
                                                                    <TableCell>10:00 - 10:50</TableCell>
                                                                    <TableCell>10:50 - 11:40</TableCell>
                                                                    <TableCell>11:40 - 12:30</TableCell>
                                                                    <TableCell>12:30 - 01:30</TableCell>
                                                                    <TableCell>01:30 - 02:20</TableCell>
                                                                    <TableCell>02:20 - 03:10</TableCell>
                                                                    <TableCell>03:10 - 04:00</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {
                                                                    tt.Classes ? tt.Classes.map(cls=>{
                                                                        // console.log(cls)
                                                                        return(
                                                                            <TableRow key={cls.className}>
                                                                                <TableCell className='p-4' onClick={()=>{
                                                                                }}>{cls.className}</TableCell>
                                                                                {
                                                                                    cls.data.map(dta=>{
                                                                                        return(
                                                                                            <TableCell key={dta.time}>
                                                                                                <Box sx={{
                                                                                                    display:"flex",
                                                                                                    flexDirection:"column",
                                                                                                    gap:"5px"
                                                                                                }}>
                                                                                                    <select id="course" value={dta.course} onChange={e=>{
                                                                                                        // console.log(TimeTable);
                                                                                                        dta.course = e.target.value;
                                                                                                        
                                                                                                    }} disabled={dta.course==="lunch" ? true : false}>
                                                                                                        <option value="select">select</option>
                                                                                                        {
                                                                                                            courses.map(crs=>{
                                                                                                                if(crs.Class===cls.className){
                                                                                                                    return(
                                                                                                                        <option value={crs.courseShortName} key={crs.courseShortName}>{crs.courseShortName}</option>
                                                                                                                    );
                                                                                                                }else{
                                                                                                                    return ''
                                                                                                                }
                                                                                                            })
                                                                                                        }
                                                                                                    </select>
                                                                                                    <select id="faculty" value={dta.faculty} onChange={e=>{
                                                                                                        dta.faculty = e.target.value
                                                                                                    }} disabled={dta.course==="lunch" ? true : false}>
                                                                                                        <option value="select">select</option>
                                                                                                        {
                                                                                                            courses.map(crs=>{
                                                                                                                if(crs.Class===cls.className){
                                                                                                                    return(
                                                                                                                        <option value={crs.faculty} key={crs.courseShortName}>{crs.faculty}</option>
                                                                                                                    );
                                                                                                                }else{
                                                                                                                    return ''
                                                                                                                }
                                                                                                            })
                                                                                                        }
                                                                                                    </select>
                                                                                                    <input type="text" placeholder='Enter Room no' value={dta.room} onChange={e=>{
                                                                                                        dta.room = e.target.value;
                                                                                                    }} disabled={dta.course==="lunch" ? true : false}/>
                                                                                                </Box>
                                                                                            </TableCell>
                                                                                        );
                                                                                    })
                                                                                }
                                                                            </TableRow>
                                                                        );
                                                                    }) : ''
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Box>
                                            );
                                        })
                                    }
                                    <Box className="d-flex justify-content-center align-items-center">
                                        <Button variant="contained" className='m-4 p-2' onClick={()=>{
                                            saveTimeTable();
                                        }}>Save TimeTable</Button>
                                    </Box>
                                </Box>
                            </Box>
                        ) : ''
                    }
                </div>
            </div>
        </div>
    );
};
export default CreateTimeTable;