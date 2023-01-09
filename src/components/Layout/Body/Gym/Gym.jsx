import './Gym.css'

import React,{useState,useEffect, useContext} from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AppContext } from '../../../../App';
import Client from "../../../../utils/Client";

const GymContext = React.createContext();

export const Gym = (props) => {
  const {pageType} = useContext(AppContext);

  const [patterns, setPatterns] = React.useState([]);
  const [pattern, setPattern] = React.useState('');
  const [exercises, setExercises] = React.useState([]);
  const [exercise, setExercise] = React.useState('');

  useEffect(() => {
      Client.exercises.getPatterns().then(setPatterns);
  }, []);

  useEffect(() => {
    if (pattern) {
      Client.exercises.getExercises(pattern.nombre).then(setExercises);
    }
  }, [pattern]);

  const context = {
    patterns: patterns,
    pattern: pattern,
    setPattern: setPattern,
    exercises: exercises,
    exercise: exercise,
    setExercise: setExercise    
  }
  
  return (
    <div className="mainGym">
      <GymContext.Provider value={context} >
        {pageType == 0 ? <TodayGym />:<HistoricGym/>}
      </GymContext.Provider>
    </div>
  );

}
const TodayGym = (props) => {
  const {exercise} = useContext(GymContext);

  const [values, setValues] = useState({peso: '-1',repeticiones: '-1',rir: '-1'});
  const [disable, setDisable] = useState(true)
  
  useEffect(() => {
    setDisable( !exercise || Object.values(values).some(v => v < 0 || !v))
  }, [values, exercise]);

  const handleSendSet = () => {
    Client.sessions.addSet(exercise.nombre, values)
  }
  
  return (
    <div className="mainGym">
      <ExerciceSelector/>
      
      <FormPropsTextFields values={values} setValues={setValues}/>  

      <Button 
        onClick={() => handleSendSet()}
        disabled={disable}
        color="inherit" >Enviar</Button>;    
    </div>
  );

}

const HistoricGym = (props) => {
  const {exercise} = useContext(GymContext);
  const [exercisesHistoric, setExercisesHistoric] = useState([])
  
  useEffect(() => {
    if (exercise.nombre)
      Client.sessions.getAllSessions(exercise.nombre).then(setExercisesHistoric)
  
  }, [exercise]);
  
  return (
    <div className="mainGym">
      <ExerciceSelector/>
      <div>
      {
        exercisesHistoric.map((elem, index) => (
          <div key={index}>{elem.EJERCICIO_S_fecha}{elem.EJERCICIO_S_nombre}</div>)    
        )
      }
      </div>
    </div>
  );

}

const ExerciceSelector = (props) => {
  const {pattern, patterns, setPattern,
        exercise, exercises, setExercise} = useContext(GymContext);
  
  const handlePattern = (event) => {
    setPattern(event.target.value);
  };

  const handleExercise = (event) => {
    setExercise(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Patron</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={pattern}
          label="Age"
          onChange={handlePattern}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {patterns.map((i,j) => <MenuItem value={i} key={j}>{i.nombre}</MenuItem>)}
        </Select>
      </FormControl>
      
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Ejercicio</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={exercise}
          onChange={handleExercise}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {exercises.map((i,j) => <MenuItem value={i} key={j}>{i.nombre}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}

const FormPropsTextFields = (props) => {
  const {values, setValues} = props

  const handleChange = (event, prop) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="peso"
          type="number"
          onChange={(e) => handleChange(e, 'peso')}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="repeticiones"
          type="number"
          onChange={(e) => handleChange(e, 'repeticiones')}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="rir"
          type="number"
          onChange={(e) => handleChange(e, 'rir')}
        />
      </div>
    </Box>
  );
}