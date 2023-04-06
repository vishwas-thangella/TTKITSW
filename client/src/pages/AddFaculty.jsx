import { FormControl, Select, TextField,  MenuItem, Box, Button, FormLabel, Dialog, DialogContent, DialogActions, DialogTitle, Alert, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import Header from '../components/Header';
import Axios from 'axios';
import BaseURL from '../config/URLS';

const AddFaculty = () =>{
    const [data,setData] = useState({
        facultyName:"",
        facShortName:"",
        dept:"select"
    });
    const [dialog,setDialog] = useState(false);
    const [severity,setSeverity] = useState('success');
    const [alertText,setAlertText] = useState('');
    const [loading,setLoading] = useState(false);
    const SubmitHandler = (e) =>{
        if(data.facultyName===''){
            setDialog(true);
            setSeverity('error');
            setAlertText('Enter Faculty Name');
        }else if(data.facShortName===''){
            setDialog(true);
            setSeverity('error');
            setAlertText('Enter Faculty Short Name');
        }else if(data.dept==='select'){
            setDialog(true);
            setSeverity('error');
            setAlertText('Select Faculty Department');
        }else{
            setLoading(true);
            Axios.post(`${BaseURL}/api/v1/faculty/add`,data).then(resp=>{
                setLoading(false);
                if(!resp.data.success){
                    setDialog(true);
                    setSeverity('error');
                    setAlertText(resp.data.message);
                }else{
                    setDialog(true);
                    setSeverity('success');
                    setAlertText(resp.data.message);
                    setData({
                        facultyName:"",
                        facShortName:"",
                        dept:"select"
                    });
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }
    return(
        <div className="row">
                <Header/>
                <Dialog open={dialog}>
                    <DialogContent>
                        <DialogTitle>Message</DialogTitle>
                        <Alert severity={severity}>{alertText}</Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{
                            setDialog(false);   
                        }}>ok</Button>
                    </DialogActions>
                </Dialog>
            <div className="col-12">
                <div className="mainCon mt-1">
                    <h4>Add Faculty</h4>
                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",width:"100% ",gap:"5px"}}>
                        <TextField placeholder='Enter Faculty Name' style={Styles.textField} onChange = {(e)=>{
                            setData({...data,[e.target.name]:e.target.value})
                        }} name = "facultyName" value={data.facultyName} required/>
                        <TextField placeholder='Enter Short Name' style={Styles.textField} onChange = {(e)=>{
                            setData({...data,[e.target.name]:e.target.value})
                        }} name="facShortName" value={data.facShortName} required/>
                        <FormControl fullWidth sx={{width:"90%"}}>
                            <FormLabel className='pl-1'>Select Department</FormLabel>
                            <Select value={data.dept} onChange={(e)=>{
                                setData({...data,dept:e.target.value});
                            }}>
                                <MenuItem value="select">Select</MenuItem>
                                <MenuItem value="it">Information Technology</MenuItem>
                                <MenuItem value="mech">Mechanical</MenuItem>
                                <MenuItem value="cse">Computer Science</MenuItem>
                                <MenuItem value="eee">EEE</MenuItem>
                                <MenuItem value="ece">ECE</MenuItem>
                                <MenuItem value="eie">EIE</MenuItem>
                            </Select>
                            {
                                loading ? <CircularProgress sx={{marginTop:"20px",marginLeft:"45%"}}/> : <Button variant="contained" className='mt-2' onClick={SubmitHandler}>Add Faculty</Button>
                            }
                        </FormControl>
                    </Box>
                </div>
            </div>
        </div>
    );  
};

const Styles = {
    textField:{
        width:"90%",
        margin:"auto",
    }
}
export default AddFaculty;