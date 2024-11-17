import React, { useState, useEffect } from 'react';

import './App.css'

import Form from './c/Form.jsx'
import Table from './c/Table.jsx'
import Login from './c/Login.jsx'

import { fetchExercises } from './api/fetchExercises';


function App() {
  const [token, setToken] = useState();
  const [exercises, setExercises] = useState()
  const [exercise, setExercise] = useState()

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const e = await fetchExercises();
        setExercises(e);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };
    fetchExercisesData();
  }, []);


  return (
    <div>
      {token ? (
        <>
          <Form 
            token={token}
            exercises={exercises}
            setExercises={setExercises}
            exercise={exercise}
            setExercise={setExercise}
            />
          <Table token={token} exercise={exercise}/>
        </>
      ) : (
        <Login setToken={setToken}/>
      )}
    </div>
  );
}

export default App;
