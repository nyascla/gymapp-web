import React,{useState,useEffect, useContext} from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Enumerations from '../../../../../utils/Enumerations';

import Client from '../../../../../utils/Client';

const sets = [
    {name:5},{name:6}
];

export default function SessionTable() {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
      Client.sessions.getSessionsHistoric().then(setSessions)  
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {sessions.map((session) => (
            <SessionRow key={session.session_date} session={session} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SessionRow(props) {
    const {session} = props
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        {/* style={{backgroundColor: Enumerations.colors.LEG}} */}
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {session.session_date}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                  <ExerciseTable session={session}/>  
              </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

export function ExerciseTable(props) {
  const {session} = props
  const [exercises, setExercises] = useState([])

  useEffect(() => {
      Client.sessions.getAllExercisesFromSession(session.session_date).then(setExercises)  
  }, [session]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {exercises.map((exercise, index) => (
            <ExerciseRow key={index} exercise={exercise} session={session}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ExerciseRow(props) {
    const {exercise, session} = props  
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}  >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {exercise.FK_session_exercise}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                  <SetTable session={session} exercise={exercise}/>  
              </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  export function SetTable(props) {
    const {exercise, session} = props  
    const [sets, setSets] = useState([])

    useEffect(() => {
        Client.sessions.getAllSetsFromSession(exercise.FK_session_exercise, session.session_date).then(setSets)  
    }, [exercise]);

    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              
              <TableCell>Weight</TableCell>
              <TableCell align="right">Rep.</TableCell>
              <TableCell align="right">rir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sets.map((set) => (
              <SetRow key={set.set_weight} set={set} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  function SetRow(props) {  
    const {set} = props   
      return (
        <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}  >
            <TableCell> {set.set_weight} </TableCell>
            <TableCell align="right">{set.set_repetitions}</TableCell>
            <TableCell align="right">{set.set_rir}</TableCell>
          </TableRow>
        </React.Fragment>
      );
    }


  export function GenericTable(props) {
    const {exercise} = props  
    const [exercises, setExercises] = useState([])

    useEffect(() => {
      if (exercise) {
        Client.sessions.getAllSessions(exercise).then(setSessionsHistoric)
      }    
    }, [exercise]);

    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              
              <TableCell>Weight</TableCell>
              <TableCell align="right">Rep.</TableCell>
              <TableCell align="right">rir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sets.map((exercises, index) => (
              <SetRow key={index} exercise={exercise} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  function GenericRow(props) {  
    const {set} = props   
      return (
        <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}  >
            <TableCell> {set.set_weight} </TableCell>
            <TableCell align="right">{set.set_repetitions}</TableCell>
            <TableCell align="right">{set.set_rir}</TableCell>
          </TableRow>
        </React.Fragment>
      );
    }

