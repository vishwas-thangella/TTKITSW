import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import BASE from '../config/URLS';
import axios from 'axios';
import { Box } from '@mui/system';
import { Paper, TableContainer, TableHead, TableRow, Typography, TableCell, Table, TableBody, Button } from '@mui/material';

const SavedTimeTables = () =>{
    const [TimeTables,setTimeTables] = useState([]);
    useEffect(()=>{
        axios.get(`${BASE}/api/v1/timetable/timetables`).then(resp=>{
            // console.log(resp);
            setTimeTables(resp.data.TimeTables);
            // console.log(TimeTables);
        }).catch(err=>{
            console.log(err);
        })
    });
    const DeleteTimeTable = id =>{
        // console.log(id);
        axios.delete(`${BASE}/api/v1/timetable/${id}`).then(resp=>{
            if(resp.data.success){
                alert(resp.data.message);
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
                {
                    TimeTables.map(item=>{
                        return(
                            <Box key={item.createdAt}>
                                <Box className="d-flex">
                                    <Typography className="p-4"> TimeTable Created at {item.createdAt}</Typography>
                                    <Button color="error" onClick={()=>{
                                        DeleteTimeTable(item._id);
                                    }}>Delete TimeTable</Button>
                                </Box>
                                {
                                    item.TimeTable.map(tt=>{
                                        return(
                                            <Box>
                                                <Typography className='p-3 text-success'>{tt.day}</Typography>
                                                <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                        <TableCell>Branch</TableCell>
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
                                                        {
                                                            tt.Classes.map(cls=>{
                                                                return(
                                                                    <TableRow>
                                                                        <TableCell className="p-4">{cls.className}</TableCell>
                                                                        {
                                                                            cls.data.map(item=>{
                                                                                return(
                                                                                    <TableCell>
                                                                                        <Box sx={{
                                                                                        display:"flex",
                                                                                        flexDirection:"column",
                                                                                        gap:"5px",
                                                                                        justifyContent:'center',
                                                                                        alignItems:'center'
                                                                                        }}>
                                                                                            <Typography>{item.course}</Typography>
                                                                                            <Typography>({item.faculty})</Typography>
                                                                                            <Typography>{item.room ? item.room : ''}</Typography>
                                                                                        </Box>
                                                                                    </TableCell>
                                                                                );
                                                                            })
                                                                        }
                                                                    </TableRow>
                                                                );
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            </Box>
                                        );
                                    })
                                }
                                <hr style={{color:"red",borderStyle:"solid",borderWidth:'5px'}}/>
                            </Box>  
                        );
                    })
                }
            </div>
        </div>
    );
};

export default SavedTimeTables;