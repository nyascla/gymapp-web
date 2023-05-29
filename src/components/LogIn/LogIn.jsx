import React, {useState} from 'react';

import { TextField, Button, FormControl } from '@mui/material';

export const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
 
    
  }

  return (
    <FormControl>
      <TextField 
        label="Nombre de usuario" 
        onChange={(event) => setUsername(event.target.value)}/>
      <TextField 
        label="Contraseña" type="password" 
        onChange={(event) => setPassword(event.target.value)}/>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleClick}
        >
        Iniciar sesión
      </Button>
    </FormControl>

  )
}
