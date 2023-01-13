import React,{useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Enumerations from '../../../utils/Enumerations';

import { AppContext } from '../../../App';

export default function Top() {
    const {                
        isOpen, setIsOpen,
        page, pageType, setPageType 
        } = useContext(AppContext);

        async function handleSideBar (e) {

        setIsOpen(!isOpen)
        }
    return (
      <AppBar position="static">
        <Toolbar>
            <IconButton
                onClick={() => handleSideBar()}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {page}
            </Typography>
            <Button color={pageType == 0 ?'inherit':'info'} onClick={() => setPageType("0")}>
                {Enumerations.pagesTypes.TODAY}
            </Button>
            <Button color={pageType == 1 ?'inherit':'info'} onClick={() => setPageType("1")}>
                {Enumerations.pagesTypes.HISTORIC}
            </Button>
        </Toolbar>
      </AppBar>
  
  );
}
