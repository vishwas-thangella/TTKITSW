import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import  Axios  from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import BASE from '../config/URLS';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SavedCourses = () =>{
    const [courses,setCourses] = useState([]);
    useEffect(()=>{
        Axios.get(`${BASE}/api/v1/course/get`).then(resp=>{
            if(resp.data.success){
                setCourses(resp.data.courses);
            }
        }).catch(err=>{
            console.log(err);
        })
    },[courses]);
    const DeleteCourse = id =>{
        Axios.delete(`${BASE}/api/v1/course/delete/${id}`).then(resp=>{
            if(resp.data.success){
                toast(resp.data.message,{
                    position:'top-right'
                });
            }else{
                toast(resp.data.message,{
                    position:'top-right',
                    type:'error'
                });
            };
        }).catch(err=>{
            console.log(err);
        });
    }
    return(
        <div className="row">
            <Header/>
            <ToastContainer/>
            <div className="col-12">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className='text-center'>Course Name</TableCell>
                                <TableCell className='text-center'>Course Code</TableCell>
                                <TableCell className='text-center'>Course Short Name</TableCell>
                                <TableCell className='text-center'>Class</TableCell>
                                <TableCell className='text-center'>Department</TableCell>
                                <TableCell className='text-center'>Faculty</TableCell>
                                <TableCell className='text-center'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                courses.map(crs=>{
                                    return(
                                        <TableRow key={crs._id}>
                                            <TableCell className='text-center'>{crs.courseName}</TableCell>
                                            <TableCell className='text-center'>{crs.courseCode}</TableCell>
                                            <TableCell className='text-center'>{crs.courseShortName}</TableCell>
                                            <TableCell className='text-center'>{crs.Class}</TableCell>
                                            <TableCell className='text-center'>{crs.dept}</TableCell>
                                            <TableCell className='text-center'>{crs.faculty}</TableCell>
                                            <TableCell className='text-center'>
                                                <Button color='error' onClick={()=>{
                                                    DeleteCourse(crs._id);
                                                }}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};  

export default SavedCourses;