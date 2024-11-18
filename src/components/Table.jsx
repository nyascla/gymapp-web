import React, { useState, useEffect } from 'react';

import { useAppContext } from "../contexts/AppContext";
import { fetchSets } from '../api/fetchSets';

import '../App.css';


function Table() {
  const { reload, exercise, token } = useAppContext();

  const [exerciseSets, setExerciseSets] = useState();

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        if (exercise) {
          setExerciseSets(await fetchSets(token, exercise));
        }
      } catch (error) {
        console.error('Error fetching sets:', error);

      }
    };
    
    asyncWrapper();
  }, [reload]);

  const generarFilas = () => {
    if (!exerciseSets) {
      return [];
    }
  
    let isSessionChanged = false;
    let lastSession = '';
  
    return exerciseSets.flatMap((exercise, i) => {
      // Si la sesión ha cambiado, alternamos el color
      if (lastSession !== exercise.session) {
        isSessionChanged = !isSessionChanged;
        lastSession = exercise.session;
      }
  
      // Generar las filas para cada set
      return exercise.sets.map((set, j) => (
        <tr
          key={`${i}-${j}`}
          className={isSessionChanged ? 'blanco' : 'gris'} // Alterna entre blanco y gris
        >
          <td>{exercise.session}</td>
          <td>{set.repetitions}</td>
          <td>{set.weight}</td>
          <td>{set.rir}</td>
        </tr>
      ));
    });
  };



  return (
    <div className="">
      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>REPS</th>
            <th>WEIGHT</th>
            <th>RIR</th>
          </tr>
        </thead>
        <tbody>
          {generarFilas()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;


