import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useEffect } from 'react';
import BASE from '../config/URLS';
import { Select, MenuItem, FormControl, FormLabel, TableContainer, Paper, Table, TableHead, TableRow,TableCell, TableBody, Typography } from '@mui/material';
import { Box } from '@mui/system';

const GetSingleTT = () =>{
    const [Classes,setClasses] = useState([]);
    const [Class,setClass] = useState('select');
    const [TimeTableDates,setTimeTableDates] = useState([]);
    const [TimeTable,setTimeTable] = useState('');
    const [date,setDate] = useState('select');
    useEffect(()=>{
        axios.get(`${BASE}/api/v1/class/all`).then(resp=>{
            // console.log(resp);
            if(resp.data.success){
                setClasses(resp.data.Classes);
            }
        }).catch(err=>{
            console.log(err);
        })
    });
    useEffect(()=>{
        axios.get(`${BASE}/api/v1/timetable/dates`).then(resp=>{
            setTimeTableDates(resp.data.dates);
        })
    },[Class]);
    useEffect(()=>{
        axios.get(`${BASE}/api/v1/timetable/single/${date}/${Class}`).then(resp=>{
            console.log(resp);
            setTimeTable(resp.data.SingleTTClasses);
        })
    },[date,Class]);
    return(
        <div className="row">
            <Header/>
            <div className="col-12">
                <FormControl required fullWidth>
                    <FormLabel className="p-2">Select Class</FormLabel>
                    <Select value={Class} onChange={e=>{
                        setClass(e.target.value);
                    }}>
                        <MenuItem value="select" >Select</MenuItem>
                        {
                            Classes ? Classes.map(cls=>{
                                return(
                                    <MenuItem key={cls._id} value={cls.className}>{cls.className}</MenuItem>
                                );
                            }) : ''
                        }
                    </Select>   
                </FormControl>
                {
                    (Class!=='select') ? <FormControl fullWidth required>
                        <FormLabel className="p-2">Select TimeTable Date</FormLabel>
                        <Select value={date} onChange={e=>{
                            setDate(e.target.value);
                        }}>
                            <MenuItem value="select">Select</MenuItem>
                            {
                                TimeTableDates ? TimeTableDates.map(dt=>{
                                    return(
                                        <MenuItem value={dt.date} key={dt.date}>{dt.date}</MenuItem>
                                    );
                                }) : ''
                            }
                        </Select>
                    </FormControl> : ''
                }
                {
                    TimeTable ? <TableContainer component={Paper} className="mt-4">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Day</TableCell>
                                    <TableCell className="text-center">09:10 - 10:00</TableCell>
                                    <TableCell className="text-center">10:00 - 10:50</TableCell>
                                    <TableCell className="text-center">10:50 - 11:40</TableCell>
                                    <TableCell className="text-center">11:40 - 12:30</TableCell>
                                    <TableCell className="text-center">12:30 - 01:30</TableCell>
                                    <TableCell className="text-center">01:30 - 02:20</TableCell>
                                    <TableCell className="text-center">02:20 - 03:10</TableCell>
                                    <TableCell className="text-center">03:10 - 04:00</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Monday</TableCell>
                                    {
                                        TimeTable ? TimeTable[0].map(tt=>{
                                            return(
                                                <TableCell key={tt.day}>
                                                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px",flexDirection:"column"}}>
                                                        <Typography>{tt.course}</Typography>
                                                        <Typography>({tt.faculty})</Typography>
                                                        {tt.room ? <Typography>{tt.room}</Typography> : ''}
                                                    </Box>
                                                </TableCell>
                                            );
                                        }) : ''
                                    }
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tuesday</TableCell>
                                    {
                                        TimeTable ? TimeTable[1].map(tt=>{
                                            return(
                                                <TableCell key={tt.day}>
                                                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px",flexDirection:"column"}}>
                                                        <Typography>{tt.course}</Typography>
                                                        <Typography>({tt.faculty})</Typography>
                                                        {tt.room ? <Typography>{tt.room}</Typography> : ''}
                                                    </Box>
                                                </TableCell>
                                            );
                                        }) : ''
                                    }
                                </TableRow>
                                <TableRow>
                                    <TableCell>Wednesday</TableCell>
                                    {
                                        TimeTable ? TimeTable[2].map(tt=>{
                                            return(
                                                <TableCell key={tt.day}>
                                                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px",flexDirection:"column"}}>
                                                        <Typography>{tt.course}</Typography>
                                                        <Typography>({tt.faculty})</Typography>
                                                        {tt.room ? <Typography>{tt.room}</Typography> : ''}
                                                    </Box>
                                                </TableCell>
                                            );
                                        }) : ''
                                    }
                                </TableRow>
                                <TableRow>
                                    <TableCell>Thursday</TableCell>
                                    {
                                        TimeTable ? TimeTable[3].map(tt=>{
                                            return(
                                                <TableCell key={tt.day}>
                                                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px",flexDirection:"column"}}>
                                                        <Typography>{tt.course}</Typography>
                                                        <Typography>({tt.faculty})</Typography>
                                                        {tt.room ? <Typography>{tt.room}</Typography> : ''}
                                                    </Box>
                                                </TableCell>
                                            );
                                        }) : ''
                                    }
                                </TableRow>
                                <TableRow>
                                    <TableCell>Friday</TableCell>
                                    {
                                        TimeTable ? TimeTable[4].map(tt=>{
                                            return(
                                                <TableCell key={tt.day}>
                                                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px",flexDirection:"column"}}>
                                                        <Typography>{tt.course}</Typography>
                                                        <Typography>({tt.faculty})</Typography>
                                                        {tt.room ? <Typography>{tt.room}</Typography> : ''}
                                                    </Box>
                                                </TableCell>
                                            );
                                        }) : ''
                                    }
                                </TableRow>
                                <TableRow>
                                    <TableCell>Saturday</TableCell>
                                    {
                                        TimeTable ? TimeTable[5].map(tt=>{
                                            return(
                                                <TableCell key={tt.day}>
                                                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px",flexDirection:"column"}}>
                                                        <Typography>{tt.course}</Typography>
                                                        <Typography>({tt.faculty})</Typography>
                                                        {tt.room ? <Typography>{tt.room}</Typography> : ''}
                                                    </Box>
                                                </TableCell>
                                            );
                                        }) : ''
                                    }
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer> : ''
                }
                
            </div>
        </div>
    );
};

export default GetSingleTT;