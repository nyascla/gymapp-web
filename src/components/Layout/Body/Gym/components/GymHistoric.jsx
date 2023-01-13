import './GymComponents.css'

import React,{useState,useEffect, useContext} from "react";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { GymContext } from "../Gym";
import Client from "../../../../../utils/Client";

export const GymHistoric = (props) => {
    const {exercise} = useContext(GymContext);
    const [open, setOpen] = useState([]);
    const [exercisesHistoric, setExercisesHistoric] = useState([])
    
    useEffect(() => {
      setOpen(Array.from({length: exercisesHistoric.length}, () => false))
    }, [exercise]);

    useEffect(() => {
      if (exercise.nombre) {
        Client.sessions.getAllSessions(exercise.nombre).then(setExercisesHistoric)
      }    
    }, [exercise]);

    const handleClick = (index) => {
      setOpen(prevArray => {
        const newArray = [...prevArray];
        newArray[index] = !prevArray[index];
        return newArray;
      });
    };
    
    return (
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >     
        {exercisesHistoric.map((elem, index) => (
          <div key = {index}>
            <ListItemButton  onClick={() => handleClick(index)}>
              <ListItemText primary={elem.sessionDate}/>
              {open[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse className='hisotric-expand'in={open[index]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {exercisesHistoric[index].sets.map((elem, index) => (
                <ListItemButton key={index*-1} sx={{ pl: 4 }}>
                  <ListItemText primary={`${elem.numero} | P - ${elem.peso} | R - ${elem.repeticiones} | rir - ${elem.rir} |`}/>
                </ListItemButton>
              ))}
            </List>
            </Collapse>

          </div>
        ))}
      </List>
    )
  }