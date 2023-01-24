import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Enumerations from '../../../../../utils/Enumerations';


const sessions = [
    {name:1},{name:2}
];

const exercises = [
    {name:3},{name:4}
];

const sets = [
    {name:5},{name:6}
];

export default function SessionTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell align="right">Pattern</TableCell>
            <TableCell align="right">volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((session) => (
            <SessionRow key={session.name} session={session} />
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
          <TableCell component="th" scope="row" style={{backgroundColor: Enumerations.colors.LEG}}>
            {session.name}
          </TableCell>
          <TableCell align="right">g</TableCell>
          <TableCell align="right">g</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                  <ExerciseTable />  
              </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

export function ExerciseTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell align="right">Pattern</TableCell>
            <TableCell align="right">volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((exercise) => (
            <ExerciseRow key={exercise.name} row={exercise} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ExerciseRow(props) {
    const {exercise} = props  
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
          <TableCell component="th" scope="row" style={{backgroundColor: Enumerations.colors.LEG}}>
            {exercise.name}
          </TableCell>
          <TableCell align="right">vv</TableCell>
          <TableCell align="right">vv</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                  <SetTable />  
              </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  export function SetTable() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell align="right">Pattern</TableCell>
              <TableCell align="right">volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sets.map((set) => (
              <SetRow key={set.name} set={set} />
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
            <TableCell component="th" scope="row" style={{backgroundColor: Enumerations.colors.LEG}}>
              {set.name}
            </TableCell>
            <TableCell align="right">cc</TableCell>
            <TableCell align="right">cc</TableCell>
          </TableRow>
        </React.Fragment>
      );
    }

