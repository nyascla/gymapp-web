import React, {useState, useContext} from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Enumerations from '../../../utils/Enumerations';
import { AppContext } from '../../../App';

export default function SideNavBar() {
    const {isOpen, setIsOpen} = useContext(AppContext);
    return (
        <div>
            <SwipeableDrawer
            anchor='left'
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            >
            <Body/>
            </SwipeableDrawer>
        </div>
    );
}

const Body = () => {
    const {setIsOpen, page, setPage} = useContext(AppContext);
    
    return(
        <Box
            sx={{ width:250 }}
            role="presentation"
            onClick={() => setIsOpen(false)}
            onKeyDown={() => setIsOpen(false)}
        >
            <h1>{page}</h1>
            <List>
            {Object.keys(Enumerations.pages).map((text, index) => (
                 <ListItem key={text} disablePadding>
                 <ListItemButton onClick={() => setPage(text)}>
                     <ListItemIcon>
                        <InboxIcon />
                     </ListItemIcon>
                     <ListItemText primary={Enumerations.pages[text]} />
                 </ListItemButton>
                 </ListItem>
            ))}                         
            </List>           
        </Box>
    );
}
