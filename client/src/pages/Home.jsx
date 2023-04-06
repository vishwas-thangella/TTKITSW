import { Avatar, Drawer, List, ListItem, ListItemAvatar, ListItemText, Typography,Paper,Card,CardActions,CardContent,Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { Actions } from '../redux/Store';
import { useNavigate } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SaveIcon from '@mui/icons-material/Save';
import TimeTablePng from '../assets/timetable.png';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookIcon from '@mui/icons-material/Book';
import TodayIcon from '@mui/icons-material/Today';

const Home = () =>{
    const navigate = useNavigate();
    const drawer = useSelector(state=>state.Drawer);
    const dispatch = useDispatch();
    return(
        <div className="row">
                <Header/>
                <Drawer anchor='left' open={drawer} onClose={()=>{
                dispatch(Actions.setDrawer(false));
            }}>
                <Box sx={{width:"300px",height:"100vh"}}>
                    <Box sx={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",gap:"10px",padding:"10px"}}>
                        <Typography>TimeTable</Typography>
                    </Box>
                    <Box>
                        <List>
                            <ListItem onClick={()=>{
                                dispatch(Actions.setDrawer(false));
                                navigate('/addfaculty');
                            }}>
                                <ListItemAvatar>
                                    <PersonAddAlt1Icon color="primary"/>
                                </ListItemAvatar>
                                <ListItemText>Add Faculty</ListItemText>
                            </ListItem>
                            <ListItem onClick={()=>{
                                navigate('/addClass');
                                dispatch(Actions.setDrawer(false));
                            }}>
                                <ListItemAvatar>
                                    <MeetingRoomIcon color="primary"/>
                                </ListItemAvatar>
                                <ListItemText>Add Class</ListItemText>
                            </ListItem>
                            <ListItem onClick={()=>{
                                navigate('/savedfaculties');
                                dispatch(Actions.setDrawer(false));
                            }}>
                                <ListItemAvatar>
                                    <PersonPinIcon color="primary"/>
                                </ListItemAvatar>
                                <ListItemText>Saved Faculties</ListItemText>
                            </ListItem>
                            <ListItem onClick={()=>{
                                navigate('/savedClasses');
                            }}>
                                <ListItemAvatar>
                                    <BeenhereIcon color="primary"/>
                                </ListItemAvatar>
                                <ListItemText>Saved Classes</ListItemText>
                            </ListItem>
                            <ListItem onClick={()=>{
                                dispatch(Actions.setDrawer(false));
                                navigate('/addCourse');
                            }}>
                                <ListItemAvatar>
                                    <MenuBookIcon color="primary"/>
                                </ListItemAvatar>
                                <ListItemText>Add Courses</ListItemText>
                            </ListItem>
                            <ListItem onClick={()=>{
                                dispatch(Actions.setDrawer(false));
                                navigate('/savedCourses');
                            }}>
                                <ListItemAvatar>
                                    <BookIcon color="primary"/>
                                </ListItemAvatar>
                                <ListItemText>Saved Courses</ListItemText>
                            </ListItem>
                            <ListItem onClick={()=>{
                                dispatch(Actions.setDrawer(false));
                                navigate('/createTimeTable');
                            }}>
                                <ListItemAvatar>
                                    <EventNoteIcon color="primary"/>
                                </ListItemAvatar>
                                <ListItemText>Create Timetable</ListItemText>
                            </ListItem>
                            <ListItem onClick={()=>{
                                dispatch(Actions.setDrawer(false));
                                navigate('/savedtimetables');
                            }}>
                                <ListItemAvatar>
                                    <SaveIcon color="primary"/>
                                </ListItemAvatar>
                                <ListItemText>Saved Timetables</ListItemText>
                            </ListItem>
                            <ListItem onClick={()=>{
                                dispatch(Actions.setDrawer(false));
                                navigate('/getsinglett');
                            }}>
                                <ListItemAvatar>
                                    <TodayIcon color="primary"/>
                                </ListItemAvatar>
                                <ListItemText>Get Single Timetable</ListItemText>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <div className="col-12">
                <h4 className='mt-2 text-center p-3'>Welcome to TimeTable Generator</h4>
                <Paper  sx={{width:"80%",height:"80vh",margin:"auto",border:"1px solid gainsboro"}}>
                    <div className="row">
                        <div className="col-lg-6 col-12" style={{height:"500px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Avatar src={TimeTablePng} sx={{width:"300px",height:"300px"}}/>
                        </div>
                        <div className="col-lg-6 col-12" style={{height:"500px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Card sx={{width:"300px"}}>
                                <CardContent>
                                    <Typography>Generate Timetable</Typography>
                                    <p>This is a Auto Time Table Generator Software which is used to Generate Time Tables according to your classes.</p>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={()=>{
                                        navigate('/generate');
                                    }}>Get Started</Button>
                                </CardActions>
                            </Card>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    );
};


export default Home;