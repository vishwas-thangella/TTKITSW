import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Axios from 'axios';
import BASE from '../config/URLS';
import { TableContainer,Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SavedFaculties = () =>{
    const [Faculties,setFaculties] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        Axios.get(`${BASE}/api/v1/faculty/get`).then(resp=>{
            setLoading(false);
            setFaculties(resp.data.faculties);
        }).catch(err=>{
            console.log(err);
        })
    });
    const DeleteFaculty = async id =>{
        await Axios.delete(`${BASE}/api/v1/faculty/delete/${id}`).then(resp=>{
            if(resp.data.success){
                toast(resp.data.message,{theme:'light',type:'success'});
            }else{
                toast(resp.data.message,{theme:'light',type:'error'});
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
                <h5 className='text-center mt-3'>Saved Faculties </h5>
                {!loading && <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{textAlign:"center"}}>ID</TableCell>
                                <TableCell sx={{textAlign:"center"}}>Name</TableCell>
                                <TableCell sx={{textAlign:"center"}}>Short Name</TableCell>
                                <TableCell sx={{textAlign:"center"}}>Department</TableCell>
                                <TableCell sx={{textAlign:"center"}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Faculties ? Faculties.map(fac=>{
                                    return(
                                        <TableRow key={fac._id}>
                                            <TableCell sx={{textAlign:"center"}}>{fac._id}</TableCell>
                                            <TableCell>{fac.facultyName}</TableCell>
                                            <TableCell sx={{textAlign:"center"}}>{fac.facShortName}</TableCell>
                                            <TableCell sx={{textAlign:"center",textTransform:"uppercase"}}>{fac.dept}</TableCell>
                                            <TableCell sx={{textAlign:"center"}}>
                                                <Button>Update</Button>
                                                <Button color="error" onClick={()=>{
                                                    DeleteFaculty(fac._id);
                                                }}>Delete</Button> 
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) : 'No data Found !'
                            }
                        </TableBody>
                    </Table>
                </TableContainer>}
                {
                    loading && <CircularProgress sx={{position:"absolute",left:"50%",top:"50%"}}/>
                }
            </div>
        </div>
    );
};

export default SavedFaculties;