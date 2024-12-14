import React, { useState, useEffect } from 'react';

import Topbar from "../components/Topbar";
import Login from "../components/Login";

import { getHomeInfo } from "../api/getHomeInfo";
import { postSet } from "../api/postSet";

import { useAppContext } from "../contexts/AppContext";

const ExerciseTable = ({ data, token }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [formData, setFormData] = useState({}); // Estado para almacenar los datos de todas las filas

  const handleToggle = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleInputChange = (exerciseTitle, idx, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [exerciseTitle]: {
        ...prev[exerciseTitle],
        [idx]: {
          ...prev[exerciseTitle]?.[idx],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (exerciseTitle, idx) => {
    const row = formData[exerciseTitle]?.[idx];
    console.log('Submit clicked for:', {
      exerciseTitle,
      ...row,
    });

    const request = {
      exercise_name: exerciseTitle,
      ...row
    };
    console.log("request", JSON.stringify(request));

    try {
      postSet(request, token)
      alert("OK")
    } catch (error) {
      alert(error)
      console.error('Error postSet:', error);
    }
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Exercise</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.rows.map((exercise, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => handleToggle(index)} style={{ cursor: 'pointer' }}>
                <td>{exercise.title}</td>
              </tr>
              {expandedRow === index && (
                <tr>
                  <td colSpan="1">
                    <table border="1">
                      <thead>
                        <tr>
                          {exercise.subtable.headers.map((header, idx) => (
                            <th key={idx}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {exercise.subtable.last.map((entry, idx) => {
                          const todayEntry = exercise.subtable.today[idx];
                          const isDisabled = todayEntry.repetitions !== 0; // Si hay datos en today, deshabilita el input
                          const rowData = formData[exercise.title]?.[idx] || {};

                          return (
                            <tr key={idx}>
                              <td>
                                <input
                                  type="number"
                                  placeholder={entry.weight} // Usar como placeholder
                                  value={rowData.weight || ''}
                                  onChange={(e) =>
                                    handleInputChange(exercise.title, idx, 'weight', Number(e.target.value))
                                  }
                                  disabled={isDisabled}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  placeholder={entry.repetitions} // Usar como placeholder
                                  value={rowData.repetitions || ''}
                                  onChange={(e) =>
                                    handleInputChange(exercise.title, idx, 'repetitions', Number(e.target.value))
                                  }
                                  disabled={isDisabled}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  placeholder={entry.rir} // Usar como placeholder
                                  value={rowData.rir || ''}
                                  onChange={(e) =>
                                    handleInputChange(exercise.title, idx, 'rir', Number(e.target.value))
                                  }
                                  disabled={isDisabled}
                                />
                              </td>
                              <td>
                                <button
                                  disabled={isDisabled}
                                  onClick={() => handleSubmit(exercise.title, idx)}
                                >
                                  Submit
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
      </tbody>
    </table>
  );
};



const Home = () => {
  const [data, setData] = useState(null);

  const { token } = useAppContext();

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        var d = await getHomeInfo(token);
        setData(d);
        // console.log("data", JSON.stringify(d));
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    if (token != null) {
      asyncWrapper();
    }
  }, [token]);

  return (
    <div>
      <Topbar />
      <Login />
      <h1>Exercise Tracker</h1>
      <ExerciseTable data={data} token={token} />
    </div>
  );
};

export default Home;
