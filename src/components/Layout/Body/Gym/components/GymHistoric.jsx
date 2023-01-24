import './GymComponents.css'

import React,{useState,useEffect, useContext} from "react";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { GymContext } from "../Gym";
import SessionTable from './GymTable';

import Client from "../../../../../utils/Client";

export const GymHistoric = (props) => {
  const {exercise} = useContext(GymContext);

    return (
      <>
        {exercise ? <GymHistoricExercice/>: <GymHistoricGeneral/>}
      </>
    )
  }

const GymHistoricExercice = (props) => {
  const {exercise} = useContext(GymContext);
  const [open, setOpen] = useState([]);
  const [sessionsHistoric, setSessionsHistoric] = useState([])
  
  useEffect(() => {
    if (exercise) {
      Client.sessions.getAllSessions(exercise).then(setSessionsHistoric)
    }    
  }, [exercise]);

  useEffect(() => {
    setOpen(Array.from({length: sessionsHistoric.length}, () => false))
  }, [exercise]);

  const handleClick = (index) => {
    setOpen(prevArray => {
      const newArray = [...prevArray];
      newArray[index] = !prevArray[index];
      return newArray;
    });
  };

  return (
    <>
      <GymChart/>

      <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      > 

      {sessionsHistoric.map((session, index) => (
        <div key = {'session'+index}>
          <ListItemButton  onClick={() => handleClick(index)}>
            <ListItemText primary={session.session_date}/>
            {open[index] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse className='hisotric-expand'in={open[index]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {session.sets.map((set, index) => (
                <ListItemButton key={'set'+index} sx={{ pl: 4 }}>
                  <ListItemText primary={`${set.set_number} | P - ${set.set_weight} | R - ${set.set_repetitions} | rir - ${set.set_rir} |`}/>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
      </List>
    </>
  )
}

const GymHistoricGeneral = (props) => {
  return (
    <>
      <SessionTable/>
    </>
  )  
}