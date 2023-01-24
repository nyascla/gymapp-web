import './Gym.css'

import React,{useEffect, useContext} from "react";

import { AppContext } from '../../../../App';
import Client from "../../../../utils/Client";

import { GymChart } from './components/GymChart';
import { GymHistoric } from './components/GymHistoric';
import { GymeSelector } from './components/GymSelector';
import { GymSessionForm } from './components/GymSessionForm';

export const GymContext = React.createContext();

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
      Client.exercises.getExercises(pattern).then(setExercises);
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
       
        <GymeSelector/>

        {pageType == 0 ? <GymSessionForm/> : <GymHistoric/>}

      </GymContext.Provider>
    </div>
  );

}
const TodayGym = (props) => {  
  return (
    <div className="mainGym">   
       
    </div>
  );
}

const HistoricGym = (props) => {
  return (
    <div className="mainGym">
      
      
    </div>
  );
}

