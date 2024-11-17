import React, { useState, useEffect } from 'react';

import { useAppContext } from "../contexts/AppContext";
import { createSet } from '../api/createSet';


function Form() {
  const { token, session, exercises, setExercise, setReload } = useAppContext();

  const [formData, setFormData] = useState({
    session_id: '',
    exercise_name: '',
    repetitions: '',
    weight: '',
    rir: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "exercise_name") {
      setExercise(value)
      setReload(prevState => !prevState);
    }

    setFormData({
      ...formData,
      [name]: value,
      ["session_id"]: session.id
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    createSet(formData);

    setReload(prevState => !prevState);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <table border="1">
          <thead>
            <tr>
              <th>User</th>
              <th>{token}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Exercise</td>
              <td>
                <select
                  name="exercise_name"
                  value={formData.exercise}
                  onChange={handleChange}
                  required
                >
                  <option value=""></option>
                  {exercises &&
                    exercises.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Repetitions</td>
              <td>
                <input
                  type="number"
                  name="repetitions"
                  value={formData.repetitions}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Rir</td>
              <td>
                <input
                  type="number"
                  name="rir"
                  value={formData.rir}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                <input type="submit" value="Enviar" />
              </td>
            </tr>

          </tbody>
        </table>
        <br />

      </form>
    </div>
  );
}

export default Form;


