import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const NotFound = () =>{
    return(
        <Box>
            <Typography sx={{fontSize:"40px",textAlign:"center",marginTop:"20px"}}>Page Not Found !</Typography>
        </Box>
    );
};

export default NotFound;