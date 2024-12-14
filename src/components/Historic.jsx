import React, { useState, useEffect } from "react";

import { getAllSets } from '../api/getAllSets';
import { useAppContext } from "../contexts/AppContext";


const Historic = ({ exercises = [] }) => {
  const [data, setData] = useState([]);

  const { token, selectedExercise, setSelectedExercise } = useAppContext();

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        const e = await getAllSets(token, selectedExercise);
        setData(e);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };
    console.log("hre")
    if (selectedExercise) {
      asyncWrapper();
    }

  }, [selectedExercise]);


  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Exercise Tracker</h2>

      {/* Desplegable para seleccionar el ejercicio */}
      <label htmlFor="exercise-select">Select Exercise: </label>
      <select
        id="exercise-select"
        value={selectedExercise}
        onChange={(e) => setSelectedExercise(e.target.value)}
        style={{ margin: "10px", padding: "5px" }}
      >
        {/* Crear opciones basadas en exercises */}
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No exercises available
          </option>
        )}
      </select>

      {/* Mostrar los sets agrupados por fecha */}
      {data ? (
        data.map((entry) => (
          <div key={entry.date} style={{ marginTop: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <h3>{entry.date}</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Set ID</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Repetitions</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Weight</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>RIR</th>
                </tr>
              </thead>
              <tbody>
                {entry.sets.map((set) => (
                  <tr key={set.id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{set.id}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{set.repetitions}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{set.weight}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{set.rir}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No data available for the selected exercise.</p>
      )}
    </div>
  );
};

export default Historic;


// Datos simulados para pruebas
// const mockData = [
//   {
//     date: "2024-12-02",
//     exercise_name: "Shoulder-Pres",
//     sets: [
//       { id: 5, repetitions: 22, weight: 22, rir: 22 },
//       { id: 6, repetitions: 22, weight: 22, rir: 22 },
//       { id: 7, repetitions: 22, weight: 22, rir: 22 },
//       { id: 8, repetitions: 22, weight: 22, rir: 22 },
//     ],
//   },
//   {
//     date: "2024-12-04",
//     exercise_name: "Shoulder-Pres",
//     sets: [
//       { id: 11, repetitions: 12, weight: 12, rir: 12 },
//     ],
//   },
// ];