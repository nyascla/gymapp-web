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
    <div className="entreno">

      {/* Mostrar los cuadros de texto y el botón si hay un elemento seleccionado */}



    </div>
  );
}

export default Eentreno;
