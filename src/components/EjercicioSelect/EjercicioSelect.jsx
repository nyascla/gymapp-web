import React, {useState} from 'react';
import Serie from '../serie/SerieModal'
import EjercicioModal from '../EjercicioModal/EjercicioModal'

import './ejercicioselect.css'


function EjercicioSelect({ isOpen, onClose }) {
    const [ejercicio, setEjercicio] = useState('');
    const [isModalSerie, setModalSerie] = useState(false);
    const [isModalEjercicios, setModalEjercicios] = useState(false);

  
    return (
      <div className="cc">
        <div>
            <button onClick={() => setModalSerie(true)}>Serie Modal</button>
            <Serie isOpen={isModalSerie} onClose={() => setModalSerie(false)} />
        </div>
        <div className="ej">
            {ejercicio}
        </div>
        <div>
            <button onClick={() => setModalEjercicios(true)}>Ejercicio Modal</button>
            <EjercicioModal 
              isOpen={isModalEjercicios} 
              onClose={() => setModalEjercicios(false)} 
              setEjercicio={setEjercicio}
            />
        </div>
      </div>
    );
  }
  

export default EjercicioSelect;
