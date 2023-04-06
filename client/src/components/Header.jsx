import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { Actions } from '../redux/Store';

const Header = () =>{
    const dispatch = useDispatch();
    return(
        <AppBar position='static'>
            <Toolbar>
                <Box sx={Styles.flexRow}>
                    <IconButton onClick={()=>{
                        dispatch(Actions.setDrawer(true));
                    }}>
                        <MenuIcon sx={{color:"white"}}/>
                    </IconButton>
                    <Typography>TimeTable Generator</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

const Styles = {
    flexRow:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:"10px"
    }
}

export default Header;