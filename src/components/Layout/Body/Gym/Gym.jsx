import React,{useEffect} from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Gym.css'

export const Gym = (props) => {
  const [ejercicio, setEjercicio] = React.useState('');
  const [values, setValues] = React.useState({
    peso: '',
    repeticiones: '',
    rir: ''
  });

  const onClick = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      body: JSON.stringify(_datos),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));

  }
  

  return (
    <div className="mainGym">
      <h2> Ejercicio </h2>
      <ExerciceSelector ejercicio={ejercicio} setEjercicio={setEjercicio}/>
      <h2> Datos <button>E</button></h2>
      <FormPropsTextFields values={values} setValues={setValues}/>
    </div>
  );

}
const TodayGym = (props) => {
  return (

    <div className="mainGym">
      <ExerciceSelector/>
      
    </div>
  );

}

const HistoricGym = (props) => {
  return (

    <div className="mainGym">
      <ExerciceSelector/>

    </div>
  );

}


const ExerciceSelector = (props) => {
  const {ejercicio, setEjercicio}=props
  const [patron, setPatron] = React.useState('');
  const [patrons, setPatrons] = React.useState([]);
  const [ejercicios, setEjercicios] = React.useState([]);

  useEffect(() => {
    fetch("api/ejercicios/patrones/")
      .then((response) => response.json())
      .then((x) => setPatrons(x));
  }, []);

  useEffect(() => {
    if (!patron)
      fetch("api/ejercicios/")
        .then((response) => response.json())
        .then((x) => setEjercicios(x));
    else
      fetch(`api/ejercicios/${patron.nombre}`)
        .then((response) => response.json())
        .then((x) => setEjercicios(x));
  }, [patron]);

  const handlePatron = (event) => {
    setPatron(event.target.value);
  };

  const handleEjercicio = (event) => {
    setEjercicio(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Patron</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={patron}
          label="Age"
          onChange={handlePatron}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {patrons.map((i,j) => <MenuItem value={i} key={j}>{i.nombre}</MenuItem>)}
        </Select>
      </FormControl>
      
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Ejercicio</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={ejercicio}
          onChange={handleEjercicio}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {ejercicios.map((i,j) => <MenuItem value={i} key={j}>{i.nombre}</MenuItem>)}
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
        <TextField
          required
          id="outlined-required"
          label="repeticiones"
          type="number"
          onChange={(e) => handleChange(e, 'repeticiones')}
        />
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





