import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchSets } from '../api/fetchSets';


function Table({ token, exercise }) {
  const [numFilas, setNumFilas] = useState(12); // Puedes cambiar este valor
  const [sets, setSets] = useState();

  useEffect(() => {
    if (!exercise) {
      return
    }
    const asyncSets = async () => {
      try {
        setSets(await fetchSets(token, exercise));
      } catch (error) {
        console.error('Error fetching sets:', error);
      }
    };
    asyncSets();
  }, [exercise]);

  // Generar las filas
  const generarFilas = () => {
    const filas = [];
    
    if (!sets){
      return filas
    }
    
    let cambiadorcambiante = true
    let lastcambiadorcambiante = ''
    for (let i = 0; i < sets.length; i++) {
      let sets_day = sets[i].sets
      
      if (lastcambiadorcambiante != sets[i].session) {
        cambiadorcambiante = !cambiadorcambiante
        lastcambiadorcambiante = sets[i].session
      }
      
      for (let j = 0; j < sets_day.length; j++) {
        filas.push(
          <tr
            key={`${i} ${j}`}
            className={cambiadorcambiante ? 'blanco' : 'gris'} // Alterna cada 3 filas
          >

            <td>{sets[i].session}</td>
            <td>{sets_day[j].repetitions}</td>
            <td>{sets_day[j].weight}</td>
            <td>{sets_day[j].rir}</td>
          </tr>
        );        
      }
    }
    return filas;
  }



  return (
    <div className="">
      <table>
        <thead>
          <tr>
            <th>Columna 1</th>
            <th>Columna 2</th>
            <th>Columna 3</th>
            <th>Columna 4</th>
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


