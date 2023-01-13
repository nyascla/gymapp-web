import React,{useState,useEffect, useContext} from "react";
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GymContext } from "../Gym";
import Client from "../../../../../utils/Client";

export const GymSessionForm = (props) => {
    const {exercise} = useContext(GymContext);
    const [disable, setDisable] = useState(true)
    const [values, setValues] = useState({peso: '-1',repeticiones: '-1',rir: '-1'});

    useEffect(() => {
        setDisable( !exercise || Object.values(values).some(v => v < 0 || !v))
    }, [values, exercise]);

    const handleSendSet = () => {
        Client.sessions.addSet(exercise.nombre, values).then(alert('OK'))
    }

    const handleChange = (event, prop) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <>
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
            
            <Button 
                onClick={() => handleSendSet()}
                disabled={disable}
                color="inherit" > Enviar
            </Button>;    
                
        </>
    );
  }