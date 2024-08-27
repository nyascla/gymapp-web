import React, { useState } from 'react';
import './ejerciciomodal.css'


function EjercicioModal({ isOpen, onClose, setEjercicio }) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Maneja la selección de un elemento
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setEjercicio(item)
  };


  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
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

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content">
        <div className='botones-patron'>

          <button onClick={() => handleGetInfo("push")}>push</button>
          <button onClick={() => handleGetInfo("pull")}>pull</button>
          <button onClick={() => handleGetInfo("legs")}>legs</button>
        </div>

        {/* Renderiza elementos */}
        <ul className='lista'>
          {data.map((data, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(data)}
              style={{
                backgroundColor: selectedItem && selectedItem === data ? '#d3d3d3' : '#f0f0f0',
              }}
            >
              {data}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default EjercicioModal;
