import React from 'react';
import './modals.css'


function ExerciseNewSerie({ isOpen, onClose }) {
    if (!isOpen) return null;

    const handleOutsideClick = (e) => {
      if (e.target.className === 'modal-overlay') {
        onClose();
      }
    };
  
    return (
      <div className="modal-overlay" onClick={handleOutsideClick}>
        <div className="modal-content">
          <h2>Introduce tus datos</h2>
          <input type="text" placeholder="Nombre" />
          <input type="text" placeholder="Apellido" />
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }
  

export default ExerciseNewSerie;
