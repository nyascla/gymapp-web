
import React,{useState,useEffect, useContext} from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { GymContext } from "../Gym";

export const GymeSelector = (props) => {
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
            {patterns.map((object,index) => <MenuItem value={object.pattern_name} key={index}>{object.pattern_name}</MenuItem>)}
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
            <MenuItem value=""><em>None</em></MenuItem>           
            {exercises.map((object,index) => <MenuItem value={object.exercise_name} key={index}>{object.exercise_name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    );
  }