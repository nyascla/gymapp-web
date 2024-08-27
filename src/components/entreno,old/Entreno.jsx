import React, { useState, useEffect } from 'react';
import './entreno.css'


function Eentreno() {

  const [data, setData] = useState([]);
  const [entrenos, setEntrenos] = useState([]);
  const [entrenoData, setEntrenoData] = useState([]);


  useEffect(() => {
    // Ahora puedes usar la URL relativa, y el proxy se encargará del resto
    fetch('/api/routine/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        return response.json();
      })
      .then((entrenos) => {
        setEntrenos(entrenos);
      })
  }, []);

  // Estado para la lista de elementos
  const [items] = useState([
    { id: 1, name: 'Elemento 1' },
    { id: 2, name: 'Elemento 2' },
    { id: 3, name: 'Elemento 3' },
  ]);

  // Estado para manejar el elemento seleccionado
  const [selectedItem, setSelectedItem] = useState(null);

  // Estado para los valores de los text boxes
  const [inputValues, setInputValues] = useState({
    exercise: '',
    weight: '',
    reps: '',
    rir: '',
  });

  // Maneja el cambio en los cuadros de texto
  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja la selección de un elemento
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setInputValues({
      exercise: item,
      weight: '',
      reps: '',
      rir: '',
    });
  };

  // Maneja el envío de la petición al servidor
  const handleSubmit = () => {
    // Enviar la petición al servidor (puedes usar fetch o axios)
    fetch('/api/routine/today', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputValues),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Éxito:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Maneja el envío de la petición al servidor
  const handleGetInfo = (info) => {
    // Enviar la petición al servidor (puedes usar fetch o axios)

    fetch("/api/routine/info/?name=A")
      // fetch(`/api/routine/info/?info=${encodeURIComponent(info)}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Maneja el envío de la petición al servidor
  const handleClickInspectDay = (entreno) => {
    // Enviar la petición al servidor (puedes usar fetch o axios)
    fetch(`/api/routine/session/?date=${encodeURIComponent(entreno)}`)
      .then((response) => response.json())
      .then((entrenoData) => {
        setEntrenoData(entrenoData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };



  return (
    <div 
      className="rr"
      style={{ padding: '20px' }}
      >

      {/* Mostrar los cuadros de texto y el botón si hay un elemento seleccionado */}
      {
        <div style={{ marginTop: '20px' }}>
          <h4>Editar: {selectedItem}</h4>
          <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
            <input
              type="number"
              name="weight"
              placeholder="weight"
              value={inputValues.weight}
              onChange={handleInputChange}
              style={{

                height: '30px' // Ajusta el ancho según tus necesidades
              }}
            />
            <input
              type="number"
              name="reps"
              placeholder="reps"
              value={inputValues.reps}
              onChange={handleInputChange}
              style={{
                height: '30px' // Ajusta el ancho según tus necesidades
              }}
            />
            <input
              type="number"
              name="rir"
              placeholder="rir"
              value={inputValues.rir}
              onChange={handleInputChange}
              style={{
                height: '30px' // Ajusta el ancho según tus necesidades
              }}
            />
            <button onClick={handleSubmit} style={{
              padding: '10px 20px', cursor: 'pointer'
            }}>
              Enviar Datos
            </button>
          </div>

        </div>
      }
      <div style={{ padding: '10px 20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button onClick={() => handleGetInfo("A")} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          A
        </button>
        <button onClick={() => handleGetInfo("B")} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          B
        </button>
        <button onClick={() => handleGetInfo("C")} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          C
        </button>
      </div>

      <div style={{ padding: '10px 20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>

        <button onClick={() => handleGetInfo("push")} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          push
        </button>
        <button onClick={() => handleGetInfo("pull")} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          pull
        </button>
        <button onClick={() => handleGetInfo("legs")} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          legs
        </button>
      </div>

      {/* Renderiza elementos */}
      <ul>
        {data.map((data, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(data)}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: selectedItem && selectedItem === data ? '#d3d3d3' : '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            {data}
          </li>
        ))}
      </ul>

      <hr />

      {/* Renderiza elementos */}
      <ul>
        {entrenos.map((entreno, index) => (
          <li
            key={index}
            onClick={() => handleClickInspectDay(entreno)}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: selectedItem && selectedItem === entreno ? '#d3d3d3' : '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            {entreno}
          </li>
        ))}
      </ul>

      {entrenoData}

    </div>
  );
}

export default Eentreno;
