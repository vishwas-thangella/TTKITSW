import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Axios from 'axios';
import BASE from '../config/URLS';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const SavedClasses = () =>{
    const [classes,setClasses] = useState([]);
    useEffect(()=>{
        Axios.get(`${BASE}/api/v1/class/all`).then(resp=>{
            // console.log(resp);
            setClasses(resp.data.Classes);
        })

    },[classes]);
    const DeleteClass = async id =>{
        Axios.delete(`${BASE}/api/v1/class/delete/${id}`).then(resp=>{
            if(resp.data.success){
                toast(resp.data.message,{
                    position:'top-right'
                });
            }else{
                toast(resp.data.message,{
                    position:'top-right',
                    type:'error'
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
                <h4 className='text-center mt-4'>Saved Classes</h4>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className='text-center'>Class Name</TableCell>
                                <TableCell className='text-center'>Class Teacher</TableCell>
                                <TableCell className='text-center'>Department</TableCell>
                                <TableCell className='text-center'>Sem</TableCell>
                                <TableCell className='text-center'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                classes ? classes.map(cls=>{
                                    return(
                                        <TableRow key={cls._id}>
                                            <TableCell className='text-center'>{cls.className}</TableCell>
                                            <TableCell className='text-center'>{cls.classTeacher}</TableCell>
                                            <TableCell className='text-center'>{cls.dept}</TableCell>
                                            <TableCell className='text-center'>{cls.sem}</TableCell>
                                            <TableCell className='text-center'>
                                                <Button color="error" onClick={()=>{
                                                    DeleteClass(cls._id);
                                                }}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) : <h5>No Data Found !</h5>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default SavedClasses;